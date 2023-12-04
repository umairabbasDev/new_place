import { URL } from "@config/index";
import axios from "axios";

const NEWSAPI_API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY
const apiUrl = URL.basic.newsapi

const NEWSAPIClient = axios.create({
    baseURL: apiUrl,
    headers: {
        "x-api-key": NEWSAPI_API_KEY,
    },
});


export default NEWSAPIClient