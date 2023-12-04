import { countries, languages } from "../data/lang_country.json"




const URL: any = {
    basic: {
        guardian: "https://content.guardianapis.com",
        newsapi: "https://newsapi.org/v2",
        nytimes: "https://api.nytimes.com/svc"
    },
    config: {
        nyt: "https://nytimes.com"
    }
}

const staticData: {
    countries: any[],
    languages: any[]
} = {
    countries,
    languages

}


export { URL, staticData }

