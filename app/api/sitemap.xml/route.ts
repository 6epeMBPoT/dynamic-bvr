import { generateSitemap } from '@/app/utils/sitemap';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
