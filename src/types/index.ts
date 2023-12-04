// ################################################# NYTimes #################################################

export interface NYTimesArticle {
    web_url: string;
    snippet: string;
    headline: {
        main: string;
    };
    pub_date: string;
    byline: {
        original: string;
    };
    section_name: string;
    source: string;
    multimedia: [{ url: string }]
}

export interface NYTimesApiResponse {
    response: {
        docs: NYTimesArticle[];
    };
}

export interface NYTimesSection {
    section: string;
}





// ################################################# NewsAPI #################################################

export interface NewsAPIArticle {
    articles: any;
    content: string
    urlToImage: string
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    author: string;
    source: {
        name: string;
    };
}


export interface NewsAPIResponse {
    articles: NewsAPIArticle[];
}


export interface NewsAPISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}



// ################################################# guardian #################################################

export interface GuardianArticle {
    id: string;
    webTitle: string;
    webUrl: string;
    webPublicationDate: string;
    sectionName: string;
    fields: {
        trailText: string;
        byline: string;
        thumbnail: string
    };
}

export interface GuardianApiResponse {
    response: {
        results: GuardianArticle[];
    };
}

export interface GuardianSection {
    id?: string;
    webTitle: string;
}

// ################################################# common #################################################


export type Statuses = "idle" | "success" | "fail" | "loading"
export interface Article {
    img: string;
    web_url: string;
    description: string;
    headline: string;
    pub_date: string;
    author: string;
    category: string;
    source: string
}

export interface SearchOptions {
    query?: string;
    fromDate?: string;
    toDate?: string;
    category?: string | string[];
    language?: string;
    country?: string;
}

export interface Filters {
    fromDate: string;
    toDate: string;
    category: string;
    source: string;
    keyword: string
}


export interface UserPreferences {
    isVisited: boolean;
    category: string[];
    lang: string;
    country: string;
    source: string[];
}

export interface UserPrefState {
    userData: UserPreferences
    sourceList: Source[]
    categoryList: Source[]
    status?: Statuses,
    error?: null | string,
}


export interface Source {
    name: string
}



type LanguageCode =
    | 'ar'
    | 'de'
    | 'en'
    | 'es'
    | 'fr'
    | 'he'
    | 'it'
    | 'nl'
    | 'no'
    | 'pt'
    | 'ru'
    | 'se'
    | 'zh';


type CountryCode =
    | 'ae'
    | 'ar'
    | 'at'
    | 'au'
    | 'be'
    | 'bg'
    | 'br'
    | 'ca'
    | 'ch'
    | 'cn'
    | 'co'
    | 'cu'
    | 'cz'
    | 'de'
    | 'eg'
    | 'fr'
    | 'gb'
    | 'gr'
    | 'hk'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'in'
    | 'it'
    | 'jp'
    | 'kr'
    | 'lt'
    | 'lv'
    | 'ma'
    | 'mx'
    | 'my'
    | 'ng'
    | 'nl'
    | 'no'
    | 'nz'
    | 'ph'
    | 'pl'
    | 'pt'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'sa'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'th'
    | 'tr'
    | 'tw'
    | 'ua'
    | 'us'
    | 've'
    | 'za';

export type CountryType = { key: CountryCode, value: string };
export type LanguageType = { key: LanguageCode, value: string };

// export interface StaticData {
//     languages: LanguageType[]
//     countries: CountryType[]
// }
