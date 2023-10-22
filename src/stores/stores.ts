import { writable } from "svelte/store";

export const settings = writable({
    ctrls: false,
    cors: true,
    corsServer: "https://185.117.153.193.nip.io/proxy/?url=",
    nModem: false,
    nMServer: "wss://185.117.153.193.nip.io",
});

export const id = writable(
    ((Math.random() * 0xffff0000 + 0xffff) >>> 0).toString(16).toUpperCase()
);

export const isSettingsLoaded = new Promise<void>((resolve) => {
    const savedSettings = JSON.parse(window.localStorage.getItem("settings"));
    savedSettings && settings.set(savedSettings);
    resolve();
});
