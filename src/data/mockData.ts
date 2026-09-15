import { Product, CategoryItem, SampleBook, IndustryItem, Testimonial, FAQItem, FeaturedCollection } from '../types';
import { siteUrl } from '../config';

import heroLeatherRolls from '../assets/images/hero_leather_rolls_1785154192570.jpg';
import aboutInteriorDining from '../assets/images/about_interior_dining_1785154208545.jpg';
import leatherSwatchesStacked from '../assets/images/leather_swatches_stacked_1785154222031.jpg';
import chairLoungeContact from '../assets/images/chair_lounge_contact_1785154236762.jpg';
import heroLeatherFolds from '../assets/images/hero_leather_folds_1785161428952.jpg';
import officeUse from '../assets/images/office-use.png';
import rexineCognacNappa from '../assets/images/rexine_cognac_nappa_1785227277160.jpg';
import rexineBurgundyWine from '../assets/images/rexine_burgundy_wine_1785227406807.jpg';
import rexineSlateCharcoal from '../assets/images/rexine_slate_charcoal_1785227428841.jpg';
import rexineEmeraldGreen from '../assets/images/rexine_emerald_green_1785227447891.jpg';
import rexineMidnightNavy from '../assets/images/rexine_midnight_navy_1785227463408.jpg';

export {
  heroLeatherRolls,
  aboutInteriorDining,
  leatherSwatchesStacked,
  chairLoungeContact,
  heroLeatherFolds,
  rexineCognacNappa,
  rexineBurgundyWine,
  rexineSlateCharcoal,
  rexineEmeraldGreen,
  rexineMidnightNavy,
};

export const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    id: 'milano',
    title: 'MILANO',
    subtitle: 'COLLECTION',
    tagline: 'Italian Nappa & Silky Smooth Leatherette',
    description: 'Ultra-luxurious, silky smooth synthetic hides engineered for executive office seating, luxury hotel suites, and high-end residential sofas.',
    designs: '30 Designs',
    image: rexineCognacNappa,
    accentColor: '#A66E38',
  },
  {
    id: 'supreme',
    title: 'SUPREME',
    subtitle: 'COLLECTION',
    tagline: 'Automotive-Grade & Heavy Duty UV Hides',
    description: 'UV-resistant, flame-retardant, and scratch-proof leatherette designed for vehicle seats, motorcycle saddles, and marine yachts.',
    designs: '28 Designs',
    image: rexineMidnightNavy,
    accentColor: '#1E2A38',
  },
  {
    id: 'royal',
    title: 'ROYAL',
    subtitle: 'COLLECTION',
    tagline: 'Velvet & Heavy Duty Woven Upholstery',
    description: 'Opulent woven textiles and plush upholstery fabrics with rich drape and spill-resistant stain shields for sofas and recliners.',
    designs: '32 Designs',
    image: rexineBurgundyWine,
    accentColor: '#581825',
  },
  {
    id: 'elite',
    title: 'ELITE',
    subtitle: 'COLLECTION',
    tagline: 'Commercial Heavy Duty PVC Sheets & Hides',
    description: 'High-density flexible PVC sheets with reinforced backing, engineered for intense footfall seating, restaurant booths, and medical clinics.',
    designs: '26 Designs',
    image: leatherSwatchesStacked,
    accentColor: '#111111',
  },
  {
    id: 'signature',
    title: 'SIGNATURE',
    subtitle: 'COLLECTION',
    tagline: 'Embossed Designer & Diamond Quilted Rexine',
    description: 'Artisanal embossed grain patterns, metallic shimmers, and stitched diamond quilted synthetic hides for wall panels and bespoke furniture.',
    designs: '29 Designs',
    image: rexineEmeraldGreen,
    accentColor: '#1E4D3A',
  },
];

export const CATEGORIES: CategoryItem[] = [
  { id: 'rexine', title: 'Rexine', count: '120+ Swatches', image: heroLeatherRolls, iconName: 'Layers', description: 'Synthetic leather for multipurpose' },
  { id: 'leatherette', title: 'Leatherette', count: '95+ Swatches', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', iconName: 'Shield', description: 'Silky luxury synthetic hide' },
  { id: 'pvc-sheets', title: 'PVC Sheets', count: '80+ Swatches', image: leatherSwatchesStacked, iconName: 'Grid', description: 'High density vinyl sheets' },
  { id: 'upholstery-fabrics', title: 'Upholstery Fabrics', count: '150+ Swatches', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop', iconName: 'Sparkles', description: 'Woven furniture textiles' },
  { id: 'sofa-fabrics', title: 'Sofa Fabrics', count: '110+ Swatches', image: aboutInteriorDining, iconName: 'Sofa', description: 'Heavy duty sofa covers' },
  { id: 'automotive-upholstery', title: 'Automotive Upholstery', count: '85+ Swatches', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop', iconName: 'Car', description: 'UV resistant auto hide' },
  { id: 'furnishing-materials', title: 'Furnishing Materials', count: '140+ Swatches', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop', iconName: 'Home', description: 'Interior design hides' },
  { id: 'decorative-materials', title: 'Decorative Materials', count: '60+ Swatches', image: chairLoungeContact, iconName: 'Crown', description: 'Embossed pattern hides' }
];

export const INDUSTRIES: IndustryItem[] = [
  { id: 'ind1', title: 'Furniture Manufacturers', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop', iconName: 'Building', description: 'Bulk supply for sofas' },
  { id: 'ind2', title: 'Interior Designers', image: aboutInteriorDining, iconName: 'Sparkles', description: 'Bespoke textures for luxury projects' },
  { id: 'ind3', title: 'Sofa Makers', image: chairLoungeContact, iconName: 'Armchair', description: 'Durable hides with high tear strength' },
  { id: 'ind4', title: 'Automotive Industry', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop', iconName: 'Car', description: 'UV-stabilized vehicle seating' },
  { id: 'ind5', title: 'Hospitality', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop', iconName: 'Building2', description: 'Flame retardant materials' },
  { id: 'ind6', title: 'Retail & Dealers', image: leatherSwatchesStacked, iconName: 'ShoppingBag', description: 'Wholesale rolls & swatch books' },
  { id: 'ind7', title: 'Architects', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', iconName: 'Building', description: 'Commercial specification guidance' },
  { id: 'ind8', title: 'Upholstery Shops', image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1275?q=80&w=800&auto=format&fit=crop', iconName: 'Wrench', description: 'Ready stock fast dispatch' }
];

// export const SAMPLE_BOOKS: SampleBook[] = [
//   { id: 'b1', name: 'Milano Master Collection 2024', code: 'BK-MILANO-24', category: 'Luxury Leatherette', totalSwatches: 48, coverImage: heroLeatherRolls, qrCodeUrl: siteUrl('/book/milano') },
//   { id: 'b2', name: 'Supreme Auto-Grade Leatherette', code: 'BK-AUTO-GRADE', category: 'Automotive Grade', totalSwatches: 32, coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop', qrCodeUrl: siteUrl('/book/supreme') },
//   { id: 'b3', name: 'Royal Sofa Fabrics Swatch Edition', code: 'BK-ROYAL-SOFA', category: 'Upholstery Fabrics', totalSwatches: 64, coverImage: aboutInteriorDining, qrCodeUrl: siteUrl('/book/royal') },
//   { id: 'b4', name: 'Elite Commercial PVC Hides', code: 'BK-ELITE-PVC', category: 'Heavy Duty Commercial', totalSwatches: 40, coverImage: leatherSwatchesStacked, qrCodeUrl: siteUrl('/book/elite') }
// ];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', author: 'Rahul Mehta', role: 'Procurement Head', company: 'Nilkamal', quote: 'Rexine has consistently delivered top quality materials for our projects. Their product range and service are exceptional.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
  { id: 't2', author: 'Amit Sharma', role: 'Interior Designer', quote: 'Rexine Centre offers a wide range of premium materials. The quality and service are exceptional!', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
  { id: 't3', author: 'Sneha Iyer', role: 'Architect', quote: 'Beautiful collections with great textures. WhatsApp enquiry makes the process so easy and quick.', rating: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop' }
];

export const REXINE_COLLECTIONS = [
  {
    id: 'pebble-grain',
    name: 'Pebble Grain',
    subtitle: 'Textured • 1.0mm',
    type: 'Textured',
    thickness: '1.0mm',
    image: heroLeatherRolls,
    price: '₹950 / Meter',
  },
  {
    id: 'nappa-finish',
    name: 'Nappa Finish',
    subtitle: 'Smooth • 1.2mm',
    type: 'Smooth',
    thickness: '1.2mm',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    price: '₹1,250 / Meter',
  },
  {
    id: 'quilted-rexine',
    name: 'Quilted Rexine',
    subtitle: 'Stitched • 1.2mm',
    type: 'Stitched',
    thickness: '1.2mm',
    image: leatherSwatchesStacked,
    price: '₹1,400 / Meter',
  },
  {
    id: 'litchi-grain',
    name: 'Litchi Grain',
    subtitle: 'Textured • 1.0mm',
    type: 'Textured',
    thickness: '1.0mm',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
    price: '₹1,100 / Meter',
  },
];

export const APPLICATIONS = [
  {
    id: 'automotive',
    title: 'Automotive',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    description: 'High durability, UV-resistant leatherette for car seats & dashboards.'
  },
  {
    id: 'furniture',
    title: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    description: 'Luxurious textures for luxury sofas, recliners, and lounge chairs.'
  },
  {
    id: 'office',
    title: 'Office',
    image: officeUse,
    description: 'Ergonomic breathable upholstery for executive office chairs & pods.'
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    image: aboutInteriorDining,
    description: 'Commercial fire-retardant hides for hotel lobbies, bars & restaurants.'
  },
  {
    id: 'marine',
    title: 'Marine',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop',
    description: 'Saltwater and mildew resistant synthetic leather for luxury yachts.'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
    description: 'Antimicrobial and easy-disinfectant vinyl for medical beds & clinics.'
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Material Selection',
    desc: 'Carefully selected raw materials.'
  },
  {
    step: '02',
    title: 'Manufacturing',
    desc: 'Advanced technology for perfect finish.'
  },
  {
    step: '03',
    title: 'Quality Testing',
    desc: 'Rigorous testing at every stage.'
  },
  {
    step: '04',
    title: 'Finishing',
    desc: 'Perfect look and feel in every detail.'
  },
  {
    step: '05',
    title: 'On-time Delivery',
    desc: 'Reliable delivery across India.'
  }
];

export const BLOG_POSTS = [

{
  id: 'b4',
  slug: 'how-to-choose-the-right-rexine-for-your-furniture',
  title: 'How to Choose the Right Rexine for Your Furniture',
  date: 'April 15, 2024',
  readTime: '8 min read',
  image:
    heroLeatherRolls,
  excerpt:
    'Learn how to choose the right rexine for sofas, chairs, beds, office seating, and commercial furniture by comparing material type, durability, texture, maintenance, and intended use.',

  // Table of contents generated automatically from sections
  tocItems: [
    { id: 'introduction', label: 'Why Choosing the Right Rexine Matters' },
    { id: 'material-types', label: 'Understand Rexine Material Types' },
    { id: 'durability', label: 'Check Durability & Performance' },
    { id: 'furniture-application', label: 'Match Rexine to Your Furniture' },
    { id: 'appearance-maintenance', label: 'Consider Appearance & Maintenance' },
    { id: 'final-selection', label: 'How to Make the Final Choice' },
  ],

  faqs: [
    {
      question: 'How do I choose the right rexine for a sofa?',
      answer:
        'Start by considering how frequently the sofa will be used, who will use it, and how often it will be cleaned. Compare the rexine’s thickness, abrasion resistance, flexibility, surface finish, backing, cleanability, and colour options. For heavily used sofas, choose a material with performance specifications appropriate for repeated daily use.'
    },
    {
      question: 'Is PU rexine better than PVC rexine for furniture?',
      answer:
        'Neither material is automatically better for every application. PU and PVC-based synthetic leather can have different characteristics in terms of feel, flexibility, appearance, durability, and maintenance. The best choice depends on the furniture and its expected use. Always compare the technical specifications of the specific rexine product rather than choosing based only on the material name.'
    },
    {
      question: 'What thickness of rexine is suitable for furniture?',
      answer:
        'The appropriate thickness depends on the furniture design and expected usage. Furniture rexine is available in different thicknesses, and a thicker material is not automatically better. Consider thickness together with backing construction, flexibility, abrasion resistance, tear strength, and the requirements of the upholstery application.'
    }
  ],

  sections: [
    {
      id: 'introduction',
      heading: 'Why Choosing the Right Rexine Matters',
      image:
        '',
      paragraphs: [
        'Rexine is widely used for furniture upholstery because it can provide a leather-like appearance while offering a practical surface for sofas, chairs, beds, benches, headboards, and other interior applications. However, not every rexine is designed for the same level of use.',
        'The right material for an occasional-use accent chair may not be suitable for an office chair that is used for several hours every day. Similarly, a residential sofa may have very different requirements from seating used in a restaurant, hotel, waiting room, healthcare facility, or other commercial environment.',
        'Choosing rexine should therefore involve more than selecting a colour from a catalogue. The material’s construction, thickness, backing, flexibility, abrasion performance, surface finish, cleaning requirements, and intended application should all be considered before purchase.',
        'A good selection process begins with one simple question: where and how will the furniture be used? Once that is clear, it becomes much easier to identify the material characteristics that matter most.'
      ]
    },

    {
      id: 'material-types',
      heading: 'Understand Rexine Material Types',
      image:
        rexineCognacNappa,
      paragraphs: [
        'Rexine is commonly used as a general term for synthetic or artificial leather materials used in applications such as furniture upholstery. Depending on the product, the construction may involve a coated textile backing and a synthetic surface layer, with PVC being common in many rexine products.',
        'PU and PVC synthetic leather can both be used for furniture, but their characteristics can differ. PU materials are often selected when a softer hand feel and leather-like appearance are important, while PVC-based materials are commonly considered for practical upholstery applications where easy cleaning and everyday durability are priorities.',
        'The material label alone should not determine your choice. Two rexines made from the same broad material category can have very different thicknesses, backing fabrics, surface finishes, textures, and performance characteristics.',
        'When comparing materials, ask the supplier for technical information rather than relying only on catalogue photographs. Check the construction, thickness, width, backing, surface finish, recommended application, and care instructions.',
        'A physical sample is particularly useful because photographs cannot always accurately represent texture, softness, grain depth, gloss, or colour. A sample also allows the upholsterer to evaluate how easily the material folds, stretches, cuts, and behaves during stitching.'
      ]
    },

    {
      id: 'durability',
      heading: 'Check Durability & Performance',
      image:
        rexineEmeraldGreen,
      paragraphs: [
        'Furniture upholstery is exposed to repeated sitting, friction, movement, stretching, spills, dust, body oils, and cleaning. For this reason, durability should be evaluated according to the actual environment in which the furniture will be used.',
        'Abrasion resistance is especially important for high-contact furniture. Sofas, office chairs, waiting-room seating, restaurant booths, and other frequently used furniture can experience substantial repeated rubbing over their service life.',
        'Flexibility is another important consideration. Rexine needs to follow curves, corners, seams, cushions, and other furniture shapes without excessive stress. A material that is too stiff for the design may be difficult to upholster properly and may not perform as expected around highly contoured areas.',
        'Thickness should also be considered, but it should not be treated as the only indicator of quality. A thicker material is not automatically the best material. Backing construction, coating formulation, flexibility, abrasion resistance, and tear performance all contribute to overall suitability.',
        'For commercial projects, request the manufacturer’s available test information and determine which performance characteristics are relevant to the installation. Depending on the application, this may include abrasion, tear strength, colour stability, chemical resistance, cleanability, and fire-performance requirements.',
        'The goal is to choose a material that can comfortably handle the expected workload rather than simply selecting the most expensive or thickest option available.'
      ]
    },

    {
      id: 'furniture-application',
      heading: 'Match Rexine to Your Furniture',
      image:
        aboutInteriorDining,
      paragraphs: [
        'Different furniture types place different demands on upholstery. Matching the rexine to the application helps achieve a better balance between appearance, comfort, durability, and cost.',
        'For residential sofas and lounge chairs, comfort and visual appearance are often major priorities. A softer rexine with an attractive grain and appropriate flexibility can work well for furniture where users frequently sit, relax, and interact with the surface.',
        'For office chairs, the material should be suitable for repeated daily contact. Seat areas, armrests, and backrests experience constant friction, so abrasion performance and cleanability become particularly important.',
        'Restaurant and hospitality furniture may require even more practical performance because the upholstery can be exposed to food, beverages, frequent cleaning, and high daily traffic. The cleaning chemicals used at the site should be compatible with the selected rexine.',
        'For beds and headboards, the visual finish may have a stronger influence on the selection. Texture, colour, softness, and overall design compatibility should be considered while still ensuring that the material is durable enough for the expected contact.',
        'For commercial seating, always consider the complete environment. Usage frequency, cleaning procedures, UV exposure, humidity, temperature, abrasion, and expected service life can all influence which rexine is appropriate.'
      ]
    },

    {
      id: 'appearance-maintenance',
      heading: 'Consider Appearance & Maintenance',
      image:
        '',
      paragraphs: [
        'Once the technical requirements are established, appearance becomes the next major consideration. Rexine is available in a wide range of colours, grain patterns, textures, gloss levels, and surface finishes, allowing furniture manufacturers and interior designers to create very different visual effects.',
        'Consider how the material will look under the lighting conditions of the actual room. A glossy surface may reflect more light and create a different impression from a matte or lightly textured finish. Dark colours can create a premium appearance, while lighter colours may make furniture feel more open but can require more careful maintenance.',
        'Texture also matters. Fine leather-like grains can provide a subtle appearance, while deeper embossed textures can create a more distinctive surface. The texture should suit the design of the furniture rather than being selected independently from it.',
        'Maintenance should be considered before finalising the material. Ask the supplier which cleaning products are compatible with the rexine and which chemicals should be avoided. This is particularly important for furniture that will be cleaned frequently.',
        'For large projects, keep a physical reference sample and record the material specifications and approved cleaning method. This helps maintenance teams use the correct products throughout the furniture’s service life.',
        'A material that looks excellent at installation but is difficult to maintain may not provide good long-term value. The best choice combines the desired appearance with a realistic maintenance routine.'
      ]
    },

    {
      id: 'final-selection',
      heading: 'How to Make the Final Choice',
      image:
        '',
      paragraphs: [
        'The final rexine selection should be based on a combination of application, performance, appearance, maintenance, and budget. No single specification should be considered in isolation.',
        'For a residential sofa, you may prioritise comfort, appearance, flexibility, stain management, and everyday durability. For an office or commercial project, abrasion resistance, cleanability, chemical compatibility, and long-term performance may become more important.',
        'Always request a sample before committing to a large quantity. Check the actual colour and texture, then discuss the material with the upholsterer or furniture manufacturer. They can also assess whether the rexine is suitable for the furniture’s curves, seams, piping, buttoning, and stitching requirements.',
        'For bulk furniture orders, ask the supplier for consistent specifications across the production quantity. Confirm the material name, colour or code, thickness, width, backing, finish, and other important specifications before production begins.',
        'Price should be considered, but it should not be the only deciding factor. A material that is inexpensive but unsuitable for the expected level of use can result in premature wear, replacement costs, and dissatisfied customers.',
        'The best rexine is ultimately the one that fits the furniture and its environment. By comparing material construction, durability, application, appearance, and maintenance requirements before purchase, you can select upholstery that provides a better balance of performance, style, and long-term value.',
        'When specifications are important, always rely on the manufacturer’s current technical data and care instructions rather than assuming that all rexine products behave in the same way.'
      ]
    }
  ]
},{
  id: 'b2',
  slug: 'pu-vs-pvc-rexine-which-is-better-for-you',
  title: 'PU vs PVC Rexine: Which is Better for You?',
  date: 'April 28, 2024',
  readTime: '7 min read',
  image: leatherSwatchesStacked,
  excerpt:
    'Understand the key differences between PU and PVC rexine to choose the right material for furniture, automotive, hospitality, and commercial applications.',

  // Table of contents generated automatically from sections
  tocItems: [
    { id: 'introduction', label: 'Introduction & Context' },
    { id: 'what-is-pu-rexine', label: 'What is PU Rexine?' },
    { id: 'what-is-pvc-rexine', label: 'What is PVC Rexine?' },
    { id: 'durability-comparison', label: 'Durability & Performance' },
    { id: 'comfort-breathability', label: 'Comfort & Breathability' },
    { id: 'maintenance-comparison', label: 'Maintenance & Care' },
    { id: 'cost-comparison', label: 'Cost & Value' },
    { id: 'which-one-to-choose', label: 'Which One Should You Choose?' },
    { id: 'conclusion', label: 'Final Verdict' },
  ],

  faqs: [
    {
      question: 'Which is better for furniture, PU or PVC rexine?',
      answer:
        'PU rexine is generally preferred for premium residential and indoor furniture because it offers a softer, more leather-like feel and better breathability. PVC rexine can be a better choice for high-traffic applications where durability, water resistance, and easy maintenance are the priorities.'
    },
    {
      question: 'Is PU rexine more durable than PVC rexine?',
      answer:
        'Not necessarily. Durability depends on the quality, thickness, backing fabric, coating formulation, and intended application. High-quality PVC can perform extremely well in demanding environments, while premium PU can provide an excellent balance of durability and comfort.'
    },
    {
      question: 'Is PU rexine waterproof?',
      answer:
        'PU rexine offers good resistance to moisture, but its performance depends on the specific construction and coating. PVC generally provides stronger resistance to water and liquid penetration, making it suitable for applications where frequent exposure to moisture is expected.'
    }
  ],

  // Structured content blocks instead of a single raw HTML string
  sections: [
    {
      id: 'introduction',
      heading: 'Introduction & Context',
      image: '',
      paragraphs: [
        'PU and PVC are two of the most widely used materials in synthetic leather and rexine production. Although they can look remarkably similar, their construction, surface feel, flexibility, maintenance requirements, and performance characteristics can differ significantly.',
        'Choosing between PU and PVC rexine is not simply a matter of selecting the more expensive material. The right choice depends on where the material will be used, how frequently the furniture or product will be handled, the desired appearance and comfort, and the level of resistance required.',
        'For furniture manufacturers, interior designers, architects, and wholesale buyers, understanding these differences can help prevent premature wear and ensure that the selected rexine matches the demands of the final application.'
      ]
    },

    {
      id: 'what-is-pu-rexine',
      heading: 'What is PU Rexine?',
      image: rexineMidnightNavy,
      paragraphs: [
        'PU stands for polyurethane, a polymer commonly used as the surface coating in synthetic leather. PU rexine is typically constructed using a fabric backing with one or more polyurethane layers that create the texture, grain, color, and finish of the final material.',
        'One of the biggest advantages of PU is its soft and flexible hand-feel. It can closely replicate the appearance and tactile characteristics of genuine leather, which makes it particularly popular for premium furniture, sofas, lounge seating, handbags, footwear, and interior applications.',
        'PU can also be engineered with different grain patterns, surface finishes, and levels of softness. This gives manufacturers considerable flexibility when developing materials for different design requirements.'
      ]
    },

    {
      id: 'what-is-pvc-rexine',
      heading: 'What is PVC Rexine?',
      image: '',
      paragraphs: [
        'PVC stands for polyvinyl chloride. PVC rexine generally consists of a textile backing combined with a PVC coating that provides the material with its color, texture, thickness, and protective surface.',
        'PVC has long been used in commercial and industrial upholstery because of its strong resistance to moisture, abrasion, and everyday wear. It is particularly useful in applications where the surface needs to withstand frequent cleaning or exposure to spills.',
        'Modern PVC rexine is available in a wide variety of colors, textures, grains, and finishes. With the right formulation and backing fabric, it can provide a practical and economical alternative to both genuine leather and other synthetic leather constructions.'
      ]
    },

    {
      id: 'durability-comparison',
      heading: 'Durability & Performance',
      image: rexineSlateCharcoal,
      paragraphs: [
        'When comparing durability, neither PU nor PVC automatically wins in every application. The performance of the finished rexine depends on factors such as coating thickness, formulation, backing fabric, abrasion resistance, surface treatment, and manufacturing quality.',
        'PVC generally performs well in environments where the material is exposed to frequent spills, repeated cleaning, and heavy everyday use. This makes it a popular choice for commercial seating, healthcare environments, restaurants, transportation interiors, and other high-traffic applications.',
        'PU can provide excellent abrasion resistance when properly engineered, but its primary advantage is often the combination of flexibility, softness, and appearance. For premium indoor furniture that requires a refined finish and comfortable seating surface, PU can be an excellent option.',
        'When sourcing material for commercial use, always review technical specifications such as abrasion resistance, tensile strength, tear strength, coating thickness, and the expected service conditions rather than choosing purely based on the material name.'
      ]
    },

    {
      id: 'comfort-breathability',
      heading: 'Comfort & Breathability',
      image: '',
      paragraphs: [
        'Comfort is one of the areas where PU rexine often has an advantage. Its softer surface and flexible construction can provide a more natural and leather-like tactile experience, particularly on sofas, lounge chairs, headboards, and premium office seating.',
        'Depending on its construction, PU can also offer better moisture vapor permeability than conventional PVC. This can make prolonged contact feel more comfortable in certain indoor environments.',
        'PVC, on the other hand, tends to have a denser and more moisture-resistant surface. While this can be beneficial for cleaning and spill resistance, it may not provide the same soft hand-feel as a premium PU material.',
        'For furniture where users spend several hours sitting against the material, surface softness and overall construction should therefore be considered alongside durability.'
      ]
    },

    {
      id: 'maintenance-comparison',
      heading: 'Maintenance & Care',
      image: '',
      paragraphs: [
        'PVC rexine is generally straightforward to maintain because its surface has strong resistance to water and everyday spills. This makes it particularly useful in commercial environments where furniture needs to be cleaned frequently.',
        'PU rexine can also be maintained easily with regular care. In most cases, routine cleaning with a soft microfiber cloth and a mild soap solution is sufficient. Excessive rubbing, abrasive cleaners, solvents, and harsh chemicals should be avoided.',
        'Regardless of whether you select PU or PVC, regular dust removal and prompt cleaning of spills can help extend the useful life of the material. Always follow the cleaning recommendations supplied by the manufacturer, especially for specialty finishes.',
        'For hospitality, healthcare, food-service, and other environments with strict cleaning requirements, it is important to confirm that the specific rexine formulation is compatible with the cleaning and disinfecting products used at the site.'
      ]
    },

    {
      id: 'cost-comparison',
      heading: 'Cost & Value',
      image: '',
      paragraphs: [
        'PVC rexine is often selected when cost efficiency and practical performance are the primary considerations. Its manufacturing process and broad availability can make it an attractive option for large-volume commercial upholstery projects.',
        'PU rexine can command a higher price in some product categories, particularly when it uses premium coatings, specialized backing fabrics, advanced embossing, or enhanced performance characteristics. However, the additional cost may be justified when appearance, softness, and premium positioning are important.',
        'The best value should therefore be measured over the expected service life of the product rather than by purchase price alone. A lower-cost material that requires frequent replacement may ultimately cost more than a higher-quality material designed for the intended environment.'
      ]
    },

    {
      id: 'which-one-to-choose',
      heading: 'Which One Should You Choose?',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      paragraphs: [
        'Choose PU rexine when a softer hand-feel, premium appearance, flexibility, and a more leather-like finish are important. It is particularly well suited to residential sofas, luxury furniture, executive seating, decorative panels, and other indoor applications where aesthetics and comfort are major priorities.',
        'Choose PVC rexine when moisture resistance, easy cleaning, heavy everyday use, and cost efficiency are more important. It can be a practical solution for restaurants, commercial seating, healthcare furniture, transportation interiors, and other demanding environments.',
        'For many projects, the decision should not be based on PU versus PVC alone. Compare the actual technical specifications of the available materials, including thickness, abrasion resistance, backing construction, tensile strength, finish, cleaning compatibility, and expected application.'
      ]
    },

    {
      id: 'conclusion',
      heading: 'Final Verdict',
      image: '',
      paragraphs: [
        'There is no universal winner between PU and PVC rexine. Both materials can deliver excellent performance when they are correctly specified and manufactured for the intended application.',
        'PU is often the stronger choice for buyers who prioritize softness, appearance, flexibility, and a premium furniture experience. PVC is often the practical choice when water resistance, easy maintenance, high traffic, and cost control are the main requirements.',
        'Before placing a bulk order, request physical samples and test them under real-world conditions. Check the hand-feel, flexibility, color, grain, abrasion performance, cleaning response, and overall appearance under the lighting conditions where the finished furniture will be used.',
        'The right rexine is ultimately the one that balances performance, aesthetics, maintenance, and cost for your specific application.'
      ]
    }
  ]
},{
  id: 'b3',
  slug: 'how-to-clean-and-maintain-rexine-products',
  title: 'How to Clean and Maintain Rexine Products',
  date: 'April 15, 2024',
  readTime: '8 min read',
  image:
    rexineBurgundyWine,
  excerpt:
    'Learn the right way to clean, protect, and maintain rexine furniture so the surface stays clean, flexible, and visually appealing for longer.',

  // Table of contents generated automatically from sections
  tocItems: [
    { id: 'introduction', label: 'Why Rexine Maintenance Matters' },
    { id: 'identify-material', label: 'Identify Your Rexine Type' },
    { id: 'spot-cleaning', label: 'How to Handle Spills & Stains' },
    { id: 'deep-cleaning', label: 'Deep Cleaning Rexine Furniture' },
    { id: 'drying-care', label: 'Drying & Post-Cleaning Care' },
    { id: 'what-to-avoid', label: 'Cleaning Products to Avoid' },
    { id: 'sunlight-humidity', label: 'Protecting Against Sunlight & Humidity' },
    { id: 'maintenance-schedule', label: 'Recommended Maintenance Schedule' },
    { id: 'conclusion', label: 'Final Maintenance Verdict' },
  ],

  faqs: [
    {
      question: 'How often should rexine furniture be cleaned?',
      answer:
        'Light dusting and wiping can be done weekly, especially on frequently used furniture. A more thorough cleaning can be performed every few months or whenever the surface develops visible dirt, stains, or buildup. High-traffic commercial furniture may require more frequent cleaning.'
    },
    {
      question: 'Can I use detergent to clean rexine?',
      answer:
        'Avoid strong detergents, bleach, solvents, and abrasive cleaners. For routine cleaning, use a soft microfiber cloth with a mild, material-compatible cleaning solution and always follow the rexine manufacturer’s care instructions.'
    },
    {
      question: 'Can rexine furniture be exposed to direct sunlight?',
      answer:
        'Prolonged direct sunlight can cause fading and may accelerate deterioration of some synthetic leather coatings. Where possible, position rexine furniture away from strong direct sunlight or use curtains, blinds, or UV-filtering window treatments.'
    }
  ],

  sections: [
    {
      id: 'introduction',
      heading: 'Why Rexine Maintenance Matters',
      image: '',
      paragraphs: [
        'Rexine is designed to provide an attractive, practical, and easy-to-maintain alternative to genuine leather. However, even a high-quality synthetic leather surface can lose its appearance when dust, body oils, spills, and unsuitable cleaning products are allowed to build up over time.',
        'Regular maintenance is not simply about keeping furniture looking clean. It also helps reduce the accumulation of abrasive particles that can gradually affect the surface finish and helps you identify small problems before they become larger ones.',
        'The most important principle is simple: clean rexine gently, use as little moisture as necessary, and avoid aggressive chemicals unless the material manufacturer specifically approves them.'
      ]
    },

    {
      id: 'identify-material',
      heading: 'Identify Your Rexine Type',
      image:
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
      paragraphs: [
        'Before selecting a cleaning product, identify whether your furniture uses PU, PVC, or another synthetic leather construction. Different coatings can react differently to solvents, detergents, oils, and disinfectants.',
        'If you are unsure about the material, check the manufacturer documentation or ask your furniture or rexine supplier. This is particularly important for commercial furniture that has specific cleaning and disinfection requirements.',
        'When trying any new cleaning product, test it first on a small, hidden section of the furniture. Check the area for changes in color, gloss, texture, stickiness, or coating after it has dried.'
      ]
    },

    {
      id: 'spot-cleaning',
      heading: 'How to Handle Spills & Stains',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
      paragraphs: [
        'Fresh spills are usually easier to deal with than old, dried stains. As soon as a spill occurs, gently blot the affected area with a clean, absorbent cloth rather than aggressively rubbing the surface.',
        'Once the excess liquid has been removed, use a soft microfiber cloth with an appropriate mild cleaning solution if required by the material manufacturer. Work gently from the outside of the affected area toward the center to reduce the risk of spreading the stain.',
        'Do not scrub aggressively in an attempt to remove a difficult mark. Excessive friction can change the appearance of the surface or damage the protective coating, particularly on lower-quality or aged rexine.',
        'For ink, dyes, grease, strong pigments, or unknown stains, avoid experimenting with household solvents. A manufacturer-approved cleaner or professional upholstery specialist is a safer option.'
      ]
    },

    {
      id: 'deep-cleaning',
      heading: 'Deep Cleaning Rexine Furniture',
      image:'',
      paragraphs: [
        'A deeper cleaning routine may be useful when furniture has accumulated body oils, dust, food residue, or general surface grime over an extended period. Begin by removing loose dust and debris before introducing any moisture.',
        'Work in small sections rather than covering the entire sofa or chair with cleaning solution at once. Apply a small amount of the approved cleaner to a microfiber cloth and gently wipe the surface.',
        'Use a second clean cloth to remove remaining residue. Avoid saturating cushions or allowing cleaning solution to remain on the rexine longer than recommended by the product manufacturer.',
        'For heavily soiled commercial furniture, healthcare seating, hospitality furniture, or surfaces that require disinfecting, confirm that the cleaning chemical is compatible with the specific rexine formulation before use.'
      ]
    },

    {
      id: 'drying-care',
      heading: 'Drying & Post-Cleaning Care',
      image:
        'https://cdnimg.co/a98e9af7-68f7-4b98-9784-cb927bb2b204/a592060f-fc49-4c68-af6e-7a01df772a0e/full-grain-leather-loveseat-leather-care.jpg',
      paragraphs: [
        'Proper drying is an important part of the cleaning process. After wiping the furniture, remove excess moisture with a clean, dry microfiber cloth and allow the surface to air dry naturally.',
        'Do not use intense heat, hair dryers, heat guns, or place the furniture directly under strong sunlight to accelerate drying. Rapid or uneven heating can negatively affect synthetic coatings and may contribute to premature deterioration.',
        'Once the surface is completely dry, inspect it under normal lighting. Look for remaining residue, streaks, discoloration, or changes in texture. If necessary, lightly buff the surface with a clean dry microfiber cloth.',
        'Avoid applying conditioners, oils, polishes, or other treatments unless they are specifically approved for your particular PU, PVC, or synthetic leather material.'
      ]
    },

    {
      id: 'what-to-avoid',
      heading: 'Cleaning Products to Avoid',
      image:
        'https://media.prod.bunnings.com.au/api/public/content/89c9f0d996854299beca71b3bf97281d?v=e1962e4c',
      paragraphs: [
        'One of the most common causes of premature rexine damage is the use of an unsuitable cleaning chemical. A product that works well on glass, metal, tiles, or natural leather may not be appropriate for a synthetic leather coating.',
        'Avoid abrasive powders, rough scrubbers, bleach, strong solvents, paint thinners, aggressive degreasers, and unapproved alcohol-based products unless the rexine manufacturer specifically states that they are compatible.',
        'Do not use rough brushes or abrasive sponges to remove stubborn stains. These can create microscopic scratches or alter the surface texture and sheen.',
        'Paper towels and rough disposable materials can also leave lint or create unnecessary friction on delicate surfaces. A soft microfiber cloth is generally a better choice for routine wiping and buffing.',
        'Most importantly, never assume that a product marketed for genuine leather is automatically suitable for PU or PVC rexine. Synthetic leather coatings have different chemical compositions and should be treated according to their own care specifications.'
      ]
    },

    {
      id: 'sunlight-humidity',
      heading: 'Protecting Against Sunlight & Humidity',
      image:
        '',
      paragraphs: [
        'Cleaning is only one part of rexine maintenance. The environment in which furniture is kept can also influence how quickly the material ages.',
        'Prolonged direct sunlight can contribute to fading and deterioration of synthetic leather coatings. Where practical, position furniture away from strong direct sunlight or use curtains and blinds to reduce exposure.',
        'High humidity and poor ventilation can also create an unfavorable environment for furniture, particularly around seams, undersides, and areas that remain damp after cleaning. Keep the room reasonably ventilated and avoid leaving moisture trapped between cushions.',
        'For commercial furniture, consider the complete environment when specifying rexine. Heat, UV exposure, cleaning frequency, abrasion, humidity, and expected daily usage should all be considered when selecting the material.'
      ]
    },

    {
      id: 'maintenance-schedule',
      heading: 'Recommended Maintenance Schedule',
      image:
        'https://i5.walmartimages.cl/asr/ad60e6b7-e24b-4834-bd62-e0657154eabc.0168d057148ed907a3c7c63265fc7b69.jpeg?odnBg=FFFFFF&odnHeight=612&odnWidth=612',
      paragraphs: [
        'A simple maintenance schedule can keep rexine furniture looking significantly better over its service life. For residential furniture, begin with a light weekly dusting and wipe-down, increasing the frequency when the furniture is heavily used.',
        'Inspect high-contact areas such as armrests, seat cushions, headrests, and edges regularly. These areas typically accumulate body oils and experience more friction than less frequently touched surfaces.',
        'Perform a more thorough cleaning every few months or according to the furniture manufacturer’s recommendations. Commercial and hospitality furniture may need a more frequent cleaning schedule because of higher traffic and more intensive use.',
        'Keep a record of the cleaning products used on commercial installations. This can help prevent incompatible chemicals from being introduced later by different cleaning teams or maintenance contractors.'
      ]
    },

    {
      id: 'conclusion',
      heading: 'Final Maintenance Verdict',
      image:
        '',
      paragraphs: [
        'Maintaining rexine does not require an aggressive cleaning routine. In most cases, consistent gentle care is more effective than occasional heavy scrubbing.',
        'Remove dust regularly, clean spills promptly, use soft microfiber cloths, choose material-compatible cleaning products, and avoid excessive moisture, heat, and harsh chemicals. These simple habits can help preserve the appearance and usability of rexine furniture.',
        'For manufacturers and bulk furniture buyers, maintenance should also be considered during material selection. A rexine designed for commercial use should be evaluated not only for appearance but also for abrasion resistance, cleanability, chemical resistance, and the specific maintenance routine expected at the installation site.',
        'When in doubt, always follow the rexine manufacturer’s technical and cleaning recommendations. A small amount of preventive care can go a long way toward extending the useful life of synthetic leather furniture.'
      ]
    }
  ]
},
];
export const STATES_LIST = [
  { name: 'Maharashtra', icon: '🏛️' },
  { name: 'Gujarat', icon: '🏭' },
  { name: 'Karnataka', icon: '🏰' },
  { name: 'Delhi', icon: '🕌' },
  { name: 'Tamil Nadu', icon: '🛕' },
  { name: 'Uttar Pradesh', icon: '🏰' },
];

export const POPULAR_CITIES = [
  'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Surat', 'Ahmedabad', 'Vadodara', 'Rajkot',
  'Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Bangalore', 'Chennai', 'Coimbatore', 'Hyderabad',
  'Jaipur', 'Lucknow', 'Kanpur', 'Indore', 'Bhopal', 'Patna', 'Kolkata'
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is Rexine made of?',
    answer: 'Rexine is a high-grade synthetic leather produced by coating a fabric backing (woven cotton or polyester mesh) with plasticized PVC or Polyurethane (PU), embossed with rich natural leather grain patterns.'
  },
  {
    id: 'faq2',
    question: 'How do I clean rexine?',
    answer: 'Simply wipe down with a damp microfiber cloth and mild soapy water. Avoid harsh solvents, abrasive scourers, or pure bleach to preserve the soft protective top layer.'
  },
  {
    id: 'faq3',
    question: 'Is rexine waterproof?',
    answer: 'Yes! High-density PVC and PU synthetic hides are 100% waterproof and moisture-resistant, making them ideal for high-traffic furniture and outdoor automotive use.'
  },
  {
    id: 'faq4',
    question: 'Can rexine be used for car seats?',
    answer: 'Absolutely. Automotive-grade rexine is UV-treated, heat-resistant, and tear-resistant specifically engineered for vehicle seating and interior panels.'
  },
  {
    id: 'faq5',
    question: 'How long does rexine last?',
    answer: 'With standard care, premium commercial rexine lasts between 7 to 12+ years without peeling, cracking, or color fading.'
  },
  {
    id: 'faq6',
    question: 'Is rexine eco friendly?',
    answer: 'Our modern eco-line uses bio-based polyurethane and phthalate-free coatings that consume significantly less water than traditional leather tanning.'
  }
];

export const TESTIMONIAL_FEATURED = {
  quote: "Rexine has consistently delivered top quality materials for our projects. Their product range and service are exceptional.",
  author: "Rahul Mehta",
  role: "Procurement Head, Nilkamal",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
};

export const PRODUCTS: Product[] = [
  // MILANO COLLECTION
  {
    id: 'p1',
    code: 'ML-01',
    name: 'Milano Cognac Silky Nappa Leatherette',
    category: 'Leatherette',
    collectionId: 'milano',
    collectionName: 'Milano Collection',
    // rrp: 1250,
    unit: 'Meter',
    description: 'Ultra-smooth Italian Nappa finish with a silky soft touch, anti-peel topcoat, and 100k Martindale abrasion resistance.',
    image: rexineCognacNappa,
    colors: [
      { name: 'Amber Cognac', hex: '#A66E38' },
      { name: 'Charcoal Slate', hex: '#2B2B2B' },
      { name: 'Warm Beige', hex: '#D6C5B3' },
      { name: 'Espresso Black', hex: '#111111' }
    ],
    specs: {
      thickness: '1.2 mm',
      width: '54 inches',
      backing: 'Microfiber Suede',
      finish: 'Satin Smooth',
      gsm: '650 GSM',
      rollLength: '25 Meters'
    },
    featured: true
  },
  {
    id: 'p2',
    code: 'ML-02',
    name: 'Milano Ivory Soft Touch Hide',
    category: 'Leatherette',
    collectionId: 'milano',
    collectionName: 'Milano Collection',
    // rrp: 1300,
    unit: 'Meter',
    description: 'Pristine ivory tone synthetic hide designed for luxury hotel bedroom headboards, lounge sofas, and executive suites.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Ivory Cream', hex: '#F0EAD6' },
      { name: 'Pearl White', hex: '#F5F5F0' },
      { name: 'Sand Khaki', hex: '#C2B280' }
    ],
    specs: {
      thickness: '1.2 mm',
      width: '54 inches',
      backing: 'Knitted Cotton Fleece',
      finish: 'Soft Matte',
      gsm: '670 GSM',
      rollLength: '25 Meters'
    }
  },
  {
    id: 'p3',
    code: 'ML-03',
    name: 'Milano Slate Grey Executive Nappa',
    category: 'Leatherette',
    collectionId: 'milano',
    collectionName: 'Milano Collection',
    // rrp: 1280,
    unit: 'Meter',
    description: 'Refined dark slate grey finish with minimal grain glare, ideal for modern ergonomic office chairs and boardroom seating.',
    image: rexineSlateCharcoal,
    colors: [
      { name: 'Slate Grey', hex: '#383D42' },
      { name: 'Midnight Charcoal', hex: '#1C2024' },
      { name: 'Gunmetal', hex: '#2A2E33' }
    ],
    specs: {
      thickness: '1.2 mm',
      width: '54 inches',
      backing: 'Reinforced Poly-Suede',
      finish: 'Low Gloss Matte',
      gsm: '660 GSM',
      rollLength: '30 Meters'
    }
  },

  // SUPREME COLLECTION (AUTOMOTIVE & HEAVY DUTY)
  {
    id: 'p4',
    code: 'SP-01',
    name: 'Supreme Midnight Navy Auto Hide',
    category: 'Automotive Upholstery',
    collectionId: 'supreme',
    collectionName: 'Supreme Collection',
    // rrp: 1450,
    unit: 'Meter',
    description: 'UV-stabilized marine & automotive grade leatherette with high heat dissipation, tear resistance, and anti-mildew coating.',
    image: rexineMidnightNavy,
    colors: [
      { name: 'Midnight Navy', hex: '#1E2A38' },
      { name: 'Stealth Black', hex: '#12161A' },
      { name: 'Deep Royal Blue', hex: '#0F1C3F' }
    ],
    specs: {
      thickness: '1.3 mm',
      width: '54 inches',
      backing: 'Heavy Woven Mesh',
      finish: 'UV Shielded Satin',
      gsm: '720 GSM',
      rollLength: '20 Meters'
    },
    featured: true
  },
  {
    id: 'p5',
    code: 'SP-02',
    name: 'Supreme Carbon Black Perforated Rexine',
    category: 'Automotive Upholstery',
    collectionId: 'supreme',
    collectionName: 'Supreme Collection',
    // rrp: 1500,
    unit: 'Meter',
    description: 'Micro-perforated breathable synthetic hide engineered for luxury car seat inserts, ventilated seats, and sports steering grips.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Carbon Black', hex: '#151515' },
      { name: 'Racing Red Trim', hex: '#8B0000' }
    ],
    specs: {
      thickness: '1.2 mm',
      width: '54 inches',
      backing: 'High Tensile Tricot',
      finish: 'Breathable Perforated',
      gsm: '700 GSM',
      rollLength: '20 Meters'
    }
  },

  // ROYAL COLLECTION (VELVET & SOFA FABRICS)
  {
    id: 'p6',
    code: 'RY-01',
    name: 'Royal Burgundy Wine Velvet Fabric',
    category: 'Sofa Fabrics',
    collectionId: 'royal',
    collectionName: 'Royal Collection',
    // rrp: 1350,
    unit: 'Meter',
    description: 'Opulent deep wine burgundy woven velvet with water-repellent backing, rich lustre, and anti-snag pile construction.',
    image: rexineBurgundyWine,
    colors: [
      { name: 'Burgundy Wine', hex: '#581825' },
      { name: 'Royal Emerald', hex: '#1E4D3A' },
      { name: 'Golden Mustard', hex: '#C29B38' },
      { name: 'Deep Ochre', hex: '#A35422' }
    ],
    specs: {
      thickness: '1.4 mm',
      width: '56 inches',
      backing: 'Latex Bonded Weave',
      finish: 'Stain Shield Velvet',
      gsm: '550 GSM',
      rollLength: '30 Meters'
    },
    featured: true
  },
  {
    id: 'p7',
    code: 'RY-02',
    name: 'Royal Heritage Jacquard Weave',
    category: 'Upholstery Fabrics',
    collectionId: 'royal',
    collectionName: 'Royal Collection',
    // rrp: 1420,
    unit: 'Meter',
    description: 'Intricate royal woven pattern fabric designed for formal living room furniture, accent armchairs, and luxury cushions.',
    image: aboutInteriorDining,
    colors: [
      { name: 'Heritage Gold', hex: '#B8860B' },
      { name: 'Warm Walnut', hex: '#5C4033' }
    ],
    specs: {
      thickness: '1.1 mm',
      width: '54 inches',
      backing: 'Woven Cotton Mesh',
      finish: 'Jacquard Textured',
      gsm: '520 GSM',
      rollLength: '35 Meters'
    }
  },

  // ELITE COLLECTION (COMMERCIAL PVC SHEETS)
  {
    id: 'p8',
    code: 'EL-01',
    name: 'Elite Heavy Duty Commercial PVC Sheet',
    category: 'PVC Sheets',
    collectionId: 'elite',
    collectionName: 'Elite Collection',
    // rrp: 890,
    unit: 'Meter',
    description: 'High-density flexible PVC sheet with tough wear layer, ideal for restaurant booth benches, cinema seats, and public waiting areas.',
    image: leatherSwatchesStacked,
    colors: [
      { name: 'Saddle Tan', hex: '#8B5A2B' },
      { name: 'Commercial Grey', hex: '#4F4F4F' },
      { name: 'Jet Black', hex: '#000000' }
    ],
    specs: {
      thickness: '1.0 mm',
      width: '54 inches',
      backing: 'Polyester Woven',
      finish: 'Heavy Duty Gloss',
      gsm: '620 GSM',
      rollLength: '40 Meters'
    }
  },
  {
    id: 'p9',
    code: 'EL-02',
    name: 'Elite Antimicrobial Healthcare Vinyl',
    category: 'PVC Sheets',
    collectionId: 'elite',
    collectionName: 'Elite Collection',
    // rrp: 980,
    unit: 'Meter',
    description: 'Chemical-resistant, bleach-cleanable medical grade PVC sheet designed for clinic beds, dentist chairs, and laboratory upholstery.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Hospital Teal', hex: '#008080' },
      { name: 'Clean Mint', hex: '#98FF98' },
      { name: 'Sky Blue', hex: '#87CEEB' }
    ],
    specs: {
      thickness: '1.1 mm',
      width: '54 inches',
      backing: 'Knitted Antimicrobial Net',
      finish: 'Easy Disinfect Surface',
      gsm: '640 GSM',
      rollLength: '30 Meters'
    }
  },

  // SIGNATURE COLLECTION (EMBOSSED & QUILTED REXINE)
  {
    id: 'p10',
    code: 'SG-01',
    name: 'Signature Emerald Metallic Pebble Rexine',
    category: 'Decorative Materials',
    collectionId: 'signature',
    collectionName: 'Signature Collection',
    // rrp: 1150,
    unit: 'Meter',
    description: 'Deep forest emerald green synthetic hide with subtle metallic sheen and high-definition pebble grain embossing.',
    image: rexineEmeraldGreen,
    colors: [
      { name: 'Emerald Forest', hex: '#1E4D3A' },
      { name: 'Metallic Bronze', hex: '#8C6239' },
      { name: 'Copper Tan', hex: '#B87333' }
    ],
    specs: {
      thickness: '1.1 mm',
      width: '54 inches',
      backing: 'Twill Cotton',
      finish: 'Metallic Pearl Sheen',
      gsm: '610 GSM',
      rollLength: '30 Meters'
    },
    featured: true
  },
  {
    id: 'p11',
    code: 'SG-02',
    name: 'Signature Diamond Stitched Quilted Rexine',
    category: 'Rexine',
    collectionId: 'signature',
    collectionName: 'Signature Collection',
    // rrp: 1400,
    unit: 'Meter',
    description: 'Precision diamond-quilted padded synthetic hide with thick foam backing for luxury headboards, bar counter panels, and auto interiors.',
    image: heroLeatherFolds,
    colors: [
      { name: 'Midnight Black', hex: '#111111' },
      { name: 'Rich Wine', hex: '#581825' },
      { name: 'Champagne Tan', hex: '#C67C4E' }
    ],
    specs: {
      thickness: '1.4 mm',
      width: '54 inches',
      backing: '10mm Foam Padding',
      finish: 'Stitched Diamond',
      gsm: '800 GSM',
      rollLength: '15 Meters'
    }
  },
  {
    id: 'p12',
    code: 'SG-03',
    name: 'Signature Litchi Grain Heavy Duty Rexine',
    category: 'Rexine',
    collectionId: 'signature',
    collectionName: 'Signature Collection',
    // rrp: 1100,
    unit: 'Meter',
    description: 'Deep litchi seed embossing offering superior scratch resistance and rugged hand feel for high-use sofa cushions.',
    image: heroLeatherRolls,
    colors: [
      { name: 'Amber Tan', hex: '#D49B4B' },
      { name: 'Mahogany Brown', hex: '#4A2511' },
      { name: 'Jet Black', hex: '#000000' }
    ],
    specs: {
      thickness: '1.0 mm',
      width: '54 inches',
      backing: 'Knitted Poly-cotton',
      finish: 'Anti-scratch Matte',
      gsm: '580 GSM',
      rollLength: '35 Meters'
    }
  },

  // CATEGORY SPECIFIC ITEMS
  {
    id: 'p13',
    code: 'FN-01',
    name: 'Furnishing Linen Look Soft Synthetic Hide',
    category: 'Furnishing Materials',
    collectionId: 'milano',
    collectionName: 'Milano Collection',
    // rrp: 1180,
    unit: 'Meter',
    description: 'Supple interior furnishing hide with subtle texture designed for acoustic wall paneling, doors, and bed surrounds.',
    image: chairLoungeContact,
    colors: [
      { name: 'Oatmeal Beige', hex: '#E3D7C5' },
      { name: 'Warm Taupe', hex: '#8B7D6B' }
    ],
    specs: {
      thickness: '1.0 mm',
      width: '54 inches',
      backing: 'Soft Woven Fleece',
      finish: 'Linen Texture Matte',
      gsm: '540 GSM',
      rollLength: '30 Meters'
    }
  }
];
