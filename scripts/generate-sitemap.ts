import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.rexinecentre.com';

const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/resources',
  '/books',
  '/applications',
  '/customizer',
  '/sitemap'
];

function extractSlugsFromRegex(content: string, regex: RegExp): string[] {
  const slugs: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match[1]) slugs.push(match[1]);
  }
  return slugs;
}

function generateSitemap() {
  const urls: string[] = [];
  const srcDataDir = path.resolve(__dirname, '../src/data');

  // Add static routes
  staticRoutes.forEach(route => {
    urls.push(`${BASE_URL}${route}`);
  });

  // Extract Blog Posts from mockData.ts
  try {
    const mockDataContent = fs.readFileSync(path.join(srcDataDir, 'mockData.ts'), 'utf-8');
    // Extract slugs from BLOG_POSTS (assumes format: slug: 'my-slug')
    const blogRegex = /slug:\s*['"]([^'"]+)['"]/g;
    const blogSlugs = extractSlugsFromRegex(mockDataContent, blogRegex);
    // Since mockData has other slugs (categories, etc), let's just use a more specific or assume all slugs go to resources?
    // Actually, blog posts have `author:` near them. Let's just blindly take all slugs and assume they are resources. 
    // A better regex: find the BLOG_POSTS array.
    const blogPostsMatch = mockDataContent.match(/export const BLOG_POSTS[^\[]*\[([\s\S]*?)\];/);
    if (blogPostsMatch) {
      const slugs = extractSlugsFromRegex(blogPostsMatch[1], /slug:\s*['"]([^'"]+)['"]/g);
      slugs.forEach(slug => urls.push(`${BASE_URL}/resources/${slug}`));
    }
  } catch (e) {
    console.warn("Could not parse mockData.ts for sitemap", e);
  }

  // Extract Books and Products
  try {
    // 1. Get books from mockBooks.ts imports
    const mockBooksContent = fs.readFileSync(path.join(srcDataDir, 'mockBooks.ts'), 'utf-8');
    const bookRegex = /import\s+.*?\s+from\s+['"]\.\/books-json\/(.*?)\.json['"]/g;
    const bookSlugs = extractSlugsFromRegex(mockBooksContent, bookRegex);
    
    bookSlugs.forEach(slug => {
      urls.push(`${BASE_URL}/books/${slug}`);
      // Try to read the book JSON to get products
      try {
        const bookJsonPath = path.join(srcDataDir, 'books-json', `${slug}.json`);
        if (fs.existsSync(bookJsonPath)) {
          const bookData = JSON.parse(fs.readFileSync(bookJsonPath, 'utf-8'));
          if (bookData.products && Array.isArray(bookData.products)) {
            bookData.products.forEach((p: any) => {
              if (p.code) {
                urls.push(`${BASE_URL}/books/${slug}/${p.code}`);
              }
            });
          }
        }
      } catch (e) {
        console.warn(`Could not parse JSON for book ${slug}`);
      }
    });
  } catch (e) {
    console.warn("Could not parse mockBooks.ts for sitemap", e);
  }

  // Extract States and Cities
  try {
    const cityDataContent = fs.readFileSync(path.join(srcDataDir, 'citySupplyData.ts'), 'utf-8');
    const statesMatch = cityDataContent.match(/export const STATE_SUPPLY_DATA[^\[]*\[([\s\S]*?)\];/);
    if (statesMatch) {
      const stateBlocks = statesMatch[1].split(/id:\s*['"]/);
      stateBlocks.forEach(block => {
        const stateSlugMatch = block.match(/stateSlug:\s*['"]([^'"]+)['"]/);
        if (stateSlugMatch) {
          const stateSlug = stateSlugMatch[1];
          urls.push(`${BASE_URL}/rexine-supplier/${stateSlug}`);
          
          // find cities Details block
          const citiesMatch = block.match(/citiesDetails:\s*\[([\s\S]*?)\]\s*,?\s*faqs/);
          if (citiesMatch) {
            const citySlugs = extractSlugsFromRegex(citiesMatch[1], /citySlug:\s*['"]([^'"]+)['"]/g);
            citySlugs.forEach(citySlug => {
              urls.push(`${BASE_URL}/rexine-supplier/${stateSlug}/${citySlug}`);
            });
          }
        }
      });
    }
  } catch (e) {
    console.warn("Could not parse citySupplyData.ts for sitemap", e);
  }

  // Deduplicate
  const uniqueUrls = [...new Set(urls)];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniqueUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
  </url>`).join('')}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent.trim());
  console.log('✅ Sitemap generated successfully at public/sitemap.xml with ' + uniqueUrls.length + ' URLs.');
}

generateSitemap();
