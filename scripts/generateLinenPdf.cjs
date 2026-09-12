const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const LINEN_SHADES = [
  { sr: '01', name: 'Ivory Mist', hex: '#E6E3DF' },
  { sr: '02', name: 'Pearl Beige', hex: '#E6E3DC' },
  { sr: '03', name: 'Warm Stone', hex: '#D9D1C8' },
  { sr: '04', name: 'Natural Greige', hex: '#C1BBAE' },
  { sr: '05', name: 'Taupe Beige', hex: '#AEA698' },
  { sr: '06', name: 'Soft Silver', hex: '#C8C9C4' },
  { sr: '07', name: 'Cool Grey', hex: '#AFAFAB' },
  { sr: '08', name: 'Charcoal Grey', hex: '#5D5D5C' },
  { sr: '09', name: 'Dusty Terracotta', hex: '#966258' },
  { sr: '10', name: 'Cocoa Brown', hex: '#79533F' },
  { sr: '11', name: 'Golden Sand', hex: '#CFB590' },
  { sr: '12', name: 'Powder Blue', hex: '#B5C3C8' },
  { sr: '13', name: 'Sage Teal', hex: '#8DA299' },
  { sr: '14', name: 'Soft Moss', hex: '#B0B695' },
  { sr: '15', name: 'Olive Green', hex: '#768261' },
  { sr: '16', name: 'Deep Eucalyptus', hex: '#495F58' }
];

function extractRgbFromPng(pngPath) {
  const png = fs.readFileSync(pngPath);
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);

  let idatBuffers = [];
  let pos = 8;
  while (pos < png.length) {
    const len = png.readUInt32BE(pos);
    const type = png.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') {
      idatBuffers.push(png.subarray(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }

  const uncompressed = zlib.inflateSync(Buffer.concat(idatBuffers));
  const rgb = Buffer.alloc(width * height * 3);
  let srcIdx = 0;
  let dstIdx = 0;

  for (let y = 0; y < height; y++) {
    srcIdx++; // skip filter byte
    for (let x = 0; x < width; x++) {
      rgb[dstIdx++] = uncompressed[srcIdx++];
      rgb[dstIdx++] = uncompressed[srcIdx++];
      rgb[dstIdx++] = uncompressed[srcIdx++];
      srcIdx++; // skip alpha
    }
  }

  return {
    width,
    height,
    deflated: zlib.deflateSync(rgb)
  };
}

class PdfWriter {
  constructor() {
    this.objects = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length; // 1-based object ID
  }

  build() {
    let out = '%PDF-1.4\n';
    const offsets = [];

    for (let i = 0; i < this.objects.length; i++) {
      offsets.push(Buffer.byteLength(out, 'utf8'));
      out += `${i + 1} 0 obj\n${this.objects[i]}\nendobj\n`;
    }

    const startXref = Buffer.byteLength(out, 'utf8');
    out += `xref\n0 ${this.objects.length + 1}\n0000000000 65535 f \n`;

    for (let i = 0; i < offsets.length; i++) {
      const offStr = String(offsets[i]).padStart(10, '0');
      out += `${offStr} 00000 n \n`;
    }

    out += `trailer\n<< /Size ${this.objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
    return Buffer.from(out, 'utf8');
  }
}

function generateLinenPdf() {
  const pdf = new PdfWriter();
  const coverPath = path.join(__dirname, '../public/book/linen-656/cover.png');
  const coverData = extractRgbFromPng(coverPath);

  // Obj 1: Catalog (will point to Pages Obj 2)
  // We reserve slot 1 and 2
  pdf.addObject('<< /Type /Catalog /Pages 2 0 R >>');
  pdf.addObject(''); // Placeholder for Pages (Obj 2)

  // Standard Fonts
  const fontHelvetica = pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const fontHelveticaBold = pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  // Cover Image Object
  const coverImgObj = pdf.addObject(
    `<< /Type /XObject /Subtype /Image /Width ${coverData.width} /Height ${coverData.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${coverData.deflated.length} >>\nstream\n` +
    coverData.deflated.toString('binary') +
    '\nendstream'
  );

  const pageObjIds = [];

  // PAGE 1: Cover Page
  // MediaBox: [0, 0, 595, 842] (A4 portrait)
  // Image placed centered
  const coverStreamText = `
q
0.96 0.95 0.93 rg
0 0 595 842 re
f
Q
q
0.78 0.49 0.31 RG
3 w
30 30 535 782 re
S
Q
BT
/F2 26 Tf
0.1 0.1 0.1 rg
190 770 Td
(REXINE CENTRE) Tj
ET
BT
/F1 11 Tf
0.4 0.4 0.4 rg
205 745 Td
(OFFICIAL SAMPLE CATALOGUE) Tj
ET
q
380 0 0 500 107.5 190 cm
/ImCover Do
Q
BT
/F2 20 Tf
0.1 0.1 0.1 rg
190 145 Td
(LINEN - 656) Tj
ET
BT
/F1 11 Tf
0.3 0.3 0.3 rg
155 125 Td
(100% Polyester Premium Upholstery) Tj
ET
BT
/F1 10 Tf
0.5 0.5 0.5 rg
135 105 Td
(380 GSM  |  140 CMS Width  |  50,000+ Martindale Rubs) Tj
ET
BT
/F1 9 Tf
0.6 0.6 0.6 rg
195 55 Td
(Official Physical Sample Binder) Tj
ET
`;

  const coverContentsObj = pdf.addObject(
    `<< /Length ${Buffer.byteLength(coverStreamText, 'utf8')} >>\nstream\n${coverStreamText}\nendstream`
  );

  const coverPageObj = pdf.addObject(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents ${coverContentsObj} 0 R /Resources << /Font << /F1 ${fontHelvetica} 0 R /F2 ${fontHelveticaBold} 0 R >> /XObject << /ImCover ${coverImgObj} 0 R >> >> >>`
  );
  pageObjIds.push(coverPageObj);

  // PAGES 2-17: Swatches
  for (let i = 0; i < LINEN_SHADES.length; i++) {
    const s = LINEN_SHADES[i];
    const swatchImgPath = path.join(__dirname, `../public/book/linen-656/products/656-${s.sr}.png`);
    const swatchData = extractRgbFromPng(swatchImgPath);

    const swatchImgObj = pdf.addObject(
      `<< /Type /XObject /Subtype /Image /Width ${swatchData.width} /Height ${swatchData.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${swatchData.deflated.length} >>\nstream\n` +
      swatchData.deflated.toString('binary') +
      '\nendstream'
    );

    const swatchStreamText = `
q
0.98 0.98 0.98 rg
0 0 595 842 re
f
Q
BT
/F2 16 Tf
0.15 0.15 0.15 rg
40 790 Td
(REXINE CENTRE  |  LINEN-656) Tj
ET
BT
/F1 11 Tf
0.5 0.5 0.5 rg
460 790 Td
(Swatch ${i + 1} of 16) Tj
ET
q
0.85 0.85 0.85 RG
1 w
40 775 515 0 re
S
Q
q
440 0 0 330 77.5 415 cm
/ImSwatch Do
Q
BT
/F2 18 Tf
0.78 0.49 0.31 rg
77 370 Td
(CODE: 656-${s.sr}) Tj
ET
BT
/F2 20 Tf
0.1 0.1 0.1 rg
77 340 Td
(${s.name}) Tj
ET
BT
/F1 12 Tf
0.35 0.35 0.35 rg
77 305 Td
(Category: 100% Polyester Upholstery) Tj
ET
BT
/F1 12 Tf
0.35 0.35 0.35 rg
77 285 Td
(Color Hex: ${s.hex}) Tj
ET
BT
/F1 12 Tf
0.35 0.35 0.35 rg
77 265 Td
(Retail RRP: Rs 1,033 / meter) Tj
ET
BT
/F1 11 Tf
0.45 0.45 0.45 rg
77 220 Td
(Specifications:) Tj
ET
BT
/F1 10 Tf
0.5 0.5 0.5 rg
77 195 Td
(Width: 140 CMS (54 Inches)  |  Weight: 380 GSM) Tj
ET
BT
/F1 10 Tf
0.5 0.5 0.5 rg
77 175 Td
(Backing: 100% Polyester  |  Abrasion: 50,000+ Martindale Rubs) Tj
ET
BT
/F1 10 Tf
0.5 0.5 0.5 rg
77 155 Td
(Suitable for: Sofas, Armchairs, Recliners & Cushions) Tj
ET
q
0.88 0.88 0.88 RG
1 w
40 70 515 0 re
S
Q
BT
/F1 9 Tf
0.6 0.6 0.6 rg
180 50 Td
(Official Rexine Centre Physical Sample Catalogue) Tj
ET
`;

    const swatchContentsObj = pdf.addObject(
      `<< /Length ${Buffer.byteLength(swatchStreamText, 'utf8')} >>\nstream\n${swatchStreamText}\nendstream`
    );

    const swatchPageObj = pdf.addObject(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents ${swatchContentsObj} 0 R /Resources << /Font << /F1 ${fontHelvetica} 0 R /F2 ${fontHelveticaBold} 0 R >> /XObject << /ImSwatch ${swatchImgObj} 0 R >> >> >>`
    );
    pageObjIds.push(swatchPageObj);
  }

  // PAGE 18: Specifications Summary Page
  const specsStreamText = `
q
0.98 0.98 0.98 rg
0 0 595 842 re
f
Q
BT
/F2 20 Tf
0.1 0.1 0.1 rg
40 790 Td
(TECHNICAL SPECIFICATIONS) Tj
ET
BT
/F1 12 Tf
0.78 0.49 0.31 rg
40 765 Td
(Official Master Edition Specification Sheet - LINEN-656) Tj
ET
q
0.8 0.8 0.8 RG
1 w
40 745 515 0 re
S
Q
BT
/F2 14 Tf
0.2 0.2 0.2 rg
40 710 Td
(Product Data) Tj
ET
BT
/F1 11 Tf
0.3 0.3 0.3 rg
40 680 Td
(Collection Code: LINEN-656) Tj
ET
BT
/F1 11 Tf
0.3 0.3 0.3 rg
40 655 Td
(Composition: 100% Polyester Heavy-Duty Woven Upholstery) Tj
ET
BT
/F1 11 Tf
0.3 0.3 0.3 rg
40 630 Td
(Width: 140 CMS / 54 Inches Standard Roll) Tj
ET
BT
/F1 11 Tf
0.3 0.3 0.3 rg
40 605 Td
(Weight: 380 GSM High-Density Weave) Tj
ET
BT
/F1 11 Tf
0.3 0.3 0.3 rg
40 580 Td
(Martindale Abrasion: 50,000+ Cycles (Commercial Grade)) Tj
ET
BT
/F1 11 Tf
0.3 0.3 0.3 rg
40 555 Td
(Backing Type: Reinforced Polyester Non-Woven Backing) Tj
ET
BT
/F1 11 Tf
0.3 0.3 0.3 rg
40 530 Td
(Applications: Heavy Domestic & Hospitality Seating) Tj
ET
BT
/F2 14 Tf
0.2 0.2 0.2 rg
40 480 Td
(Care & Maintenance) Tj
ET
BT
/F1 10 Tf
0.4 0.4 0.4 rg
40 455 Td
(Vacuum regularly with a soft upholstery brush attachment.) Tj
ET
BT
/F1 10 Tf
0.4 0.4 0.4 rg
40 435 Td
(Wipe spills immediately using a clean, damp microfiber cloth with mild soapy water.) Tj
ET
BT
/F1 10 Tf
0.4 0.4 0.4 rg
40 415 Td
(Avoid harsh solvent-based or chlorinated cleaning agents.) Tj
ET
BT
/F2 14 Tf
0.2 0.2 0.2 rg
40 365 Td
(Wholesale Supply & Orders) Tj
ET
BT
/F1 10 Tf
0.3 0.3 0.3 rg
40 340 Td
(Rexine Centre Wholesale Distribution Network) Tj
ET
BT
/F1 10 Tf
0.3 0.3 0.3 rg
40 320 Td
(Phone / WhatsApp: +91 81040 19890) Tj
ET
BT
/F1 10 Tf
0.3 0.3 0.3 rg
40 300 Td
(Email: info@rexinecentre.com  |  Website: https://rexinecentre.com) Tj
ET
q
0.88 0.88 0.88 RG
1 w
40 70 515 0 re
S
Q
BT
/F1 9 Tf
0.6 0.6 0.6 rg
180 50 Td
(Rexine Centre  -  All Rights Reserved) Tj
ET
`;

  const specsContentsObj = pdf.addObject(
    `<< /Length ${Buffer.byteLength(specsStreamText, 'utf8')} >>\nstream\n${specsStreamText}\nendstream`
  );

  const specsPageObj = pdf.addObject(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents ${specsContentsObj} 0 R /Resources << /Font << /F1 ${fontHelvetica} 0 R /F2 ${fontHelveticaBold} 0 R >> >> >>`
  );
  pageObjIds.push(specsPageObj);

  // Now update Obj 2 (Pages catalog)
  const kidsStr = pageObjIds.map(id => `${id} 0 R`).join(' ');
  pdf.objects[1] = `<< /Type /Pages /Kids [${kidsStr}] /Count ${pageObjIds.length} >>`;

  const pdfBuffer = pdf.build();
  const destPdf = path.join(__dirname, '../public/book/linen-656/catalogue.pdf');
  fs.writeFileSync(destPdf, pdfBuffer);
  console.log(`Generated official catalogue PDF: ${destPdf} (${pdfBuffer.length} bytes, ${pageObjIds.length} pages)`);
}

generateLinenPdf();
