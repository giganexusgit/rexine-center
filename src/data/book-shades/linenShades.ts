export interface BookShade {
  sr: string;
  name: string;
  hex: string;
}

export type BookShades = BookShade;

export const LINEN_SHADES: BookShade[] = [
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

export default LINEN_SHADES;
