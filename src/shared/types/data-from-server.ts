export type RawJSON = {
  title: string;
  description: string;
  items: Data;
};

export type Data = Array<ObjFromData>;

export type ObjFromData = {
  id: string;
  name: string;
  imgPath: string;
  additionalInfo: string;
  aboutMe: string[];
  url: URL;
};

export type URL = {
  adress: string;
  name: string;
};
