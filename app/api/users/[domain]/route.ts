import { numbersTxt } from '@/app/utils/utils';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: any) {
    const { domain } = await params;
    const host = request.headers.get('host') as string;
    const domainParts = host.split('.');
    const secondHost =
        domainParts.length > 1 ? domainParts.slice(-2).join('.') : host;

    const data = await prisma.subdomain.findFirst({ where: { subdomain: domain } });
    if (!data) {
        return NextResponse.json(
            { error: 'Not Found' },
            { status: 404 }
        );
    }
    const userAgent = request.headers.get('user-agent') || '';
    const isBot = /Googlebot|YandexBot|bingbot|DuckDuckBot|Baiduspider/i.test(userAgent);

    if (isBot) {
        const headers = new Headers({ 'Content-Type': 'text/html' });

        const content = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>${data.name} берет в рот</title>
    <meta property="og:title" content="${data.name} берет в рот" />
    <meta name="description"
        content="${data.description},\nВозьму в рот." />
</head>

<body>
    <h1>${data.name}, ${data.distance} ${numbersTxt(Number(data.distance), ['метр', 'метра', 'метров'])} от вас</h1>
    <p>${data.description}, Возьму в рот.</p>
</body>

</html>
`
        return new NextResponse(content, { headers });
    }

    return NextResponse.redirect(`https://${domain}.${secondHost}`);
}
