'use server';

import { prisma } from "@/lib/prisma";
import { removeTrailingPunctuation } from "../utils/utils";

export async function publishForm(data: FormData, subdomain: string) {
    const domain = await prisma.subdomain.findFirst({ where: { subdomain } });
    if (domain) {
        return {
            error: true,
            message: 'Этот домен уже зарегистрирован'
        }
    }

    const description = removeTrailingPunctuation(data.get('description') as string ?? 'Куплю пива');

    const createdData = await prisma.subdomain.create({
        data: {
            subdomain: subdomain,
            name: data.get('name') as string ?? 'default',
            description,
            distance: (data.get('distance') as string ?? '300').toString(),
            key: Math.random().toString(36).substring(2, 12),
            url: data.get('url') as string || undefined,
            background_color: data.get('color') as string ?? '#000000',
        }
    })

    return {
        error: false,
        data: createdData
    };
}
