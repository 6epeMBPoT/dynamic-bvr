'use server';

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from '@/lib/prisma';
import Client from "./client";
import Register from "./register";

const getSubdomain = async (subdomain: string) => await prisma.subdomain.findFirst({ where: { subdomain } });

const Home = async () => {
    const headersList = await headers();
    const host = headersList.get('host') as string;

    const fragments = host.split('.');
    const data = await getSubdomain(fragments[0]);

    //await prisma.subdomain.update({ where: { subdomain: 'andcool' }, data: { description: `Напишу код,\nПоложу прод` } })

    if (!data) {
        return <Register subdomain={fragments[0]} />
    }

    return <Client data={data} />;
}

export default Home;
