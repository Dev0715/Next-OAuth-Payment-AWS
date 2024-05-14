import { atom } from "jotai";

const s3LinkAtom = atom<Record<string, string>>({});

export { s3LinkAtom };
