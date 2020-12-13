import LavaStore from "lavastore";

export const AppDocument = new LavaStore("app");
export const LocationCache = new LavaStore('location');

AppDocument.InsurePath("cache/ui");
AppDocument.InsurePath("cache/search");