import { URL } from "@config/index";
import { Article, GuardianArticle, NYTimesArticle, NewsAPIArticle } from "../types";


export const createNewsApiData = (data: NewsAPIArticle[]): Article[] => {
  return data.map((item: NewsAPIArticle) => ({
    img: item?.urlToImage || "",
    source: item?.source?.name || "",
    headline: item?.title.split("-")[0] || "",
    web_url: item?.url || "",
    category: "News",
    description: item?.description || "",
    author: item?.author || "unknown",
    pub_date: item?.publishedAt || "",
  }));
};

export const createGuardianApiData = (data: GuardianArticle[]): Article[] => {
  return data.map((item: GuardianArticle) => ({
    img: item?.fields?.thumbnail || "",
    source: "The Guardian",
    headline: item?.webTitle || "",
    web_url: item?.webUrl || "",
    category: item?.sectionName || "",
    description: item?.fields?.trailText || "",
    author: item?.fields.byline || "unknown",
    pub_date: item?.webPublicationDate || "",
  }));
};

export const createNYApiData = (data: NYTimesArticle[]): Article[] => {
  console.log("createNYApiData : ", data);
  return data.map((item: NYTimesArticle) => ({
    img: `${URL.config.nyt}/${item?.multimedia?.[0]?.url || ""}`,
    source: item?.source || "",
    headline: item?.headline.main || "",
    web_url: item?.web_url || "",
    category: item?.section_name || "",
    description: item?.snippet || "",
    author: item?.byline.original || "unknown",
    pub_date: item?.pub_date || "",
  }));
};
