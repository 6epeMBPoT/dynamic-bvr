"use client";

import styles from '@/app/styles/main.module.css';
import { formatText, inverseColor, isBright, numbersTxt } from "./utils/utils";
import { CSSProperties, useEffect, useState } from "react";
import Register from "./register";
import { Subdomain } from './utils/interfaces';


const Client = ({ data }: { data: Subdomain }) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [editAvailable, setEditAvailable] = useState<boolean>(false);
    const [key, setKey] = useState<string>('');
    const bright = isBright(data.background_color);

    useEffect(() => {
        const keys = window.localStorage.getItem('keys');
        const keys_json = JSON.parse(keys ?? '{}') as { [key: string]: string };
        if (!!keys && keys_json[data.subdomain]) {
            setEditAvailable(true);
            setKey(keys_json[data.subdomain]);
        }
    });

    return (
        <>
            {editing ? <Register data={data} subdomain={data.subdomain} auth_key={key} edit /> : <Display data={data} />}
            {editAvailable && !editing &&
                <div
                    onClick={() => setEditing(true)}
                    className={styles.edit}
                    style={{ backgroundColor: inverseColor(data.background_color) }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke={bright ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                        <path d="M16 5l3 3" />
                    </svg>
                </div>
            }
        </>
    )
}

const Display = ({ data }: { data: Subdomain }) => {
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
            <div className={styles.container}>
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