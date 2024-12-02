"use client";

import styles from '@/app/styles/main.module.css';
import { formatText, inverseColor, isBright, numbersTxt } from "./utils/utils";
import { CSSProperties, useEffect, useState } from "react";
import Register from "./register";
import { Subdomain } from './utils/interfaces';
import Edit from '@/app/static/edit.svg';


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
                    <Edit
                        alt='edit'
                        style={{ filter: `invert(${bright ? 1 : 0})` }}
                        width={24}
                        height={24} />
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