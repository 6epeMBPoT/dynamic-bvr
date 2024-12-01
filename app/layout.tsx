import '@/app/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "беретврот.рф",
    description: "На этом сайте можно увидеть людей, которые любят брать у кого-то в рот. Это стоит уважать, ведь каждый может дать в рот, но не каждый - взять.",
    other: {
        "darkreader-lock": "darkreader-lock"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
