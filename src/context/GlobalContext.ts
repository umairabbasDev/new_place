import { createContext } from "react";
import { countries, languages } from '../data/lang_country.json'

export const GlobalContext = createContext({
    languages,
    countries,
    source: [],
    category: [],
    userData: {
        lang: "",
        country: "",
    },
    filter: {}
});
