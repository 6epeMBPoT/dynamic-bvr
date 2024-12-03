
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface SitemapProps {
    loc: string,
    lastmod?: string,
    priority?: string | number,
    changefreq?: string
}

const generateSitemap = (elements: SitemapProps[]) => {
    const elements_str = elements.map((element) => {
        return (
            '<url>\n' +
            `<loc>${element.loc}</loc>\n` +
            (element.lastmod ? `<lastmod>${element.lastmod}</lastmod>\n` : '') +
            (element.priority ? `<priority>${element.priority}</priority>\n` : '') +
            (element.changefreq ? `<changefreq>${element.changefreq}</changefreq>\n` : '') +
            '</url>\n'
        );
    });

    const xml_urls = elements_str.join('');
    const result = (
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        xml_urls +
        '</urlset>'
    );

    return result;
}

export async function GET(request: Request) {
    const subdomains = await prisma.subdomain.findMany();

    const host = request.headers.get('host') as string;
    const domainParts = host.split('.');
    const secondHost =
        domainParts.length > 1 ? domainParts.slice(-2).join('.') : host;

    const pages = subdomains.map(domain => ({ loc: `https://${secondHost}/api/users/${domain.subdomain}` }));
    const xml = generateSitemap(pages);

    const headers = new Headers({
        'Content-Type': 'application/xml',
    });

    return new NextResponse(xml, { headers });
}
