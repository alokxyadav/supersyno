import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://supersyno.in', lastModified: new Date(), priority: 1.0 },
    { url: 'https://supersyno.in/super-syno-classic', lastModified: new Date(), priority: 0.8 },
    { url: 'https://supersyno.in/sign-up-login', lastModified: new Date(), priority: 0.5 },
    { url: 'https://supersyno.in/admin-dashboard', lastModified: new Date(), priority: 0.3 },
  ];
}