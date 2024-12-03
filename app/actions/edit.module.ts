'use server';

import { prisma } from "@/lib/prisma";
import { removeTrailingPunctuation } from "../utils/utils";

export async function editForm(data: FormData, subdomain: string, key: string) {
    const domain = await prisma.subdomain.findFirst({ where: { subdomain } });
    if (!domain) {
        return {
            error: true,
            message: 'Домен не найден'
        }
    }

    if (domain.key !== key) {
        return {
            error: true,
            message: 'Неверный ключ'
        }
    }

    const description = removeTrailingPunctuation(data.get('description') as string ?? 'Куплю пива');

    const editedRecord = await prisma.subdomain.update({
        where: { subdomain: subdomain },
        data: {
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
        data: editedRecord
    };
}
