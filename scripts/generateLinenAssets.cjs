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

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16)
  ];
}

function createPng(width, height, getPixelRgba) {
  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;

  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixelRgba(x, y);
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  function crc32(buf) {
    let table = crc32.table;
    if (!table) {
      table = crc32.table = new Uint32Array(256);
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let k = 0; k < 8; k++) {
          c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        }
        table[i] = c >>> 0;
      }
    }
    let c = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
    }
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

const targetDir = path.join(__dirname, '../public/book/linen-656');
const productsDir = path.join(targetDir, 'products');
fs.mkdirSync(productsDir, { recursive: true });

// 1. Generate 16 Swatch PNGs (400x300)
LINEN_SHADES.forEach(shade => {
  const [baseR, baseG, baseB] = hexToRgb(shade.hex);
  const width = 400;
  const height = 300;

  const pngBuffer = createPng(width, height, (x, y) => {
    // Linen fabric cross-weave simulation
    const weft = Math.sin(x * 0.7) * 8;
    const warp = Math.cos(y * 0.7) * 8;
    const cross = (Math.sin((x + y) * 0.4) + Math.cos((x - y) * 0.4)) * 5;
    const slubNoise = Math.sin(x * 3.1 + y * 5.7) * 4;
    const fineGrain = ((x * 17 + y * 31) % 11 - 5);
    
    // Vignette
    const dx = (x - width / 2) / (width / 2);
    const dy = (y - height / 2) / (height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const vignette = -Math.pow(dist, 2) * 10;

    const delta = weft + warp + cross + slubNoise + fineGrain + vignette;

    const r = Math.min(255, Math.max(0, Math.round(baseR + delta)));
    const g = Math.min(255, Math.max(0, Math.round(baseG + delta)));
    const b = Math.min(255, Math.max(0, Math.round(baseB + delta)));

    return [r, g, b, 255];
  });

  const fileName = '656-' + shade.sr + '.png';
  const filePath = path.join(productsDir, fileName);
  fs.writeFileSync(filePath, pngBuffer);
  console.log('Saved swatch: ' + fileName + ' (' + shade.name + ')');
});

// 2. Generate Cover PNG (480x600)
const coverWidth = 480;
const coverHeight = 600;

const coverBuffer = createPng(coverWidth, coverHeight, (x, y) => {
  const weft = Math.sin(x * 0.5) * 8;
  const warp = Math.cos(y * 0.5) * 8;
  const grain = ((x * 23 + y * 41) % 9 - 4);
  
  let baseR = 38;
  let baseG = 36;
  let baseB = 34;

  // Gold outer decorative border
  const borderWidth = 4;
  const pad = 24;
  const inBorder = (
    (x >= pad && x <= pad + borderWidth && y >= pad && y <= coverHeight - pad) ||
    (x >= coverWidth - pad - borderWidth && x <= coverWidth - pad && y >= pad && y <= coverHeight - pad) ||
    (y >= pad && y <= pad + borderWidth && x >= pad && x <= coverWidth - pad) ||
    (y >= coverHeight - pad - borderWidth && y <= coverHeight - pad && x >= pad && x <= coverWidth - pad)
  );

  if (inBorder) {
    return [229, 185, 76, 255]; // Elegant gold
  }

  // Inner border
  const pad2 = 32;
  const inBorder2 = (
    (x >= pad2 && x <= pad2 + 1 && y >= pad2 && y <= coverHeight - pad2) ||
    (x >= coverWidth - pad2 - 1 && x <= coverWidth - pad2 && y >= pad2 && y <= coverHeight - pad2) ||
    (y >= pad2 && y <= pad2 + 1 && x >= pad2 && x <= coverWidth - pad2) ||
    (y >= coverHeight - pad2 - 1 && y <= coverHeight - pad2 && x >= pad2 && x <= coverWidth - pad2)
  );

  if (inBorder2) {
    return [198, 124, 78, 220]; // Terracotta accent
  }

  // Centered Swatch Palette Preview band (y from 340 to 490)
  if (y >= 340 && y <= 490 && x >= 52 && x <= 428) {
    const colWidth = (428 - 52) / 8;
    const swatchCol = Math.floor((x - 52) / colWidth);
    const isTopRow = y <= 410;
    const idx = (isTopRow ? swatchCol : (swatchCol + 8)) % 16;
    const shade = LINEN_SHADES[idx];
    const [sR, sG, sB] = hexToRgb(shade.hex);
    
    // Border between swatches
    const relX = (x - 52) % colWidth;
    const relY = isTopRow ? (y - 340) : (y - 420);
    if (relX <= 1.5 || relX >= colWidth - 1.5 || relY <= 1.5 || relY >= 68.5) {
      return [18, 18, 18, 255];
    }
    const weave = Math.sin(x * 0.7) * 6 + Math.cos(y * 0.7) * 6;
    return [
      Math.min(255, Math.max(0, Math.round(sR + weave))),
      Math.min(255, Math.max(0, Math.round(sG + weave))),
      Math.min(255, Math.max(0, Math.round(sB + weave))),
      255
    ];
  }

  // Warm textured vignette
  const grad = Math.round((y / coverHeight) * 14);
  const delta = weft + warp + grain - grad;

  return [
    Math.min(255, Math.max(0, baseR + delta)),
    Math.min(255, Math.max(0, baseG + delta)),
    Math.min(255, Math.max(0, baseB + delta)),
    255
  ];
});

fs.writeFileSync(path.join(targetDir, 'cover.png'), coverBuffer);
console.log('Saved cover: cover.png');
