import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Random = async () => {
    const headersList = await headers();
    const host = headersList.get('host') as string;
    const fragments = host.split('.');

    const subdomains = await prisma.subdomain.findMany();
    const domain = subdomains[Math.floor(Math.random() * subdomains.length)].subdomain;

    redirect(`https://${domain}.${fragments.slice(1).join('.')}`);
}

export default Random;