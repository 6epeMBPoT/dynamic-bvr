"use client";

import { Subdomain } from "@prisma/client";
import styles from '@/app/styles/main.module.css';
import { formatText, isBright, numbersTxt } from "./utils/utils";
import { CSSProperties } from "react";

const Client = ({ data }: { data: Subdomain }) => {
    const bright = isBright(data.background_color);

    return (
        <main
            style={
                {
                    backgroundColor: data.background_color,
                    '--color': bright ? '#3f3f3f' : '#aaa'
                } as CSSProperties
            }
            className={styles.main}
        >
            <div style={{ 'maxWidth': '50%' }}>
                <h1>
                    <a href={data.url ?? undefined} className={`${styles.link} ${bright && styles.link_bright}`}>
                        {data.name.slice(0, 15)}
                    </a>, {data.distance} {numbersTxt(Number(data.distance), ['метр', 'метра', 'метров'])} от вас.
                </h1>
                <h2 style={{ wordBreak: 'break-word' }}>{formatText(data.description + ',\nВозьму в рот.')}</h2>
            </div>
        </main>
    )
}

export default Client;