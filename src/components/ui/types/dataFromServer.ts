export type RawJSON = {
    title: string;
    description: string;
    items: Data;
}

export type Data = {
    id: number;
    name: string;
    imgPath: string;
    additionalInfo: string;
    aboutMe: string[];
    url: URL;
}[]

export type URL = {
    adress: string;
    name: string;
}

export type ObjFromData = {
    id: number;
    name: string;
    imgPath: string;
    additionalInfo: string;
    aboutMe: string[];
    url: URL;
}
