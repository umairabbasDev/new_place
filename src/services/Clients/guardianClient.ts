import axios from "axios";

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

const apiUrl = "https://content.guardianapis.com";
const guardianClient = axios.create({
    baseURL: apiUrl,
    params: {
        "api-key": GUARDIAN_API_KEY
    },
});


export default guardianClient