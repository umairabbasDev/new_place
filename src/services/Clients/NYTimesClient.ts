import { URL } from "@config/index";
import axios from "axios";

const NYTIMES_API_KEY = import.meta.env.VITE_NEWYORK_API_KEY;
const apiUrl = URL.basic.nytimes

const NYTimesClient = axios.create({
    baseURL: apiUrl,
    params: {
        "api-key": NYTIMES_API_KEY
    },
});


export default NYTimesClient