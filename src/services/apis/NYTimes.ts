import { AxiosResponse } from 'axios';
import { NYTimesApiResponse, NYTimesArticle, NYTimesSection, SearchOptions } from "../../types";
import NYTimesClient from "../Clients/NYTimesClient";


const NYTimes = {
  // HeadLines: async (categories: string[]) => {
  //   try {
  //     const response = await NYTimesClient.get("/search/v2/articlesearch.json")
  //     return response.data.response.docs;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },


  Headlines: async (categories: string[]): Promise<NYTimesArticle[]> => {

    const headlines: NYTimesArticle[] = [];

    for (const category of categories) {

      try {
        const response: AxiosResponse = await NYTimesClient.get(`/topstories/v2/${category}.json`);

        if (response.status === 200) {
          headlines.push(response.data.results);
        }
      } catch (error: any) {
        console.error(`Error fetching headlines: ${error.message}`);
      }
    }

    return headlines;
  },




  search: async (options: SearchOptions): Promise<NYTimesArticle[]> => {
    const { query, fromDate, toDate, category } = options;

    const queryParams = [`q=${query}`];
    queryParams.push('facet_fields=section_name&facet_filter=true')

    if (fromDate) {
      queryParams.push(`begin_date=${fromDate}`);
    }
    if (toDate) {
      queryParams.push(`end_date=${toDate}`);
    }


    if (category) {
      queryParams.push(`fq=${category}`);
    }
  
    const fullUrl = `/search/v2/articlesearch.json?${queryParams.join('&')}`;

    try {
      const response: AxiosResponse<NYTimesApiResponse> = await NYTimesClient.get(fullUrl);
      return response.data.response.docs;
    } catch (error: any) {
      console.error('Error fetching articles:', error.message);
      throw error;
    }
  },

  category: async (): Promise<NYTimesSection[]> => {
    try {
      const response = await NYTimesClient.get('/news/v3/content/section-list.json', { params: { country: "us" } });
      return response.data.results.map((result: NYTimesSection) => ({
        name: result.section,
      }));
    } catch (error) {
      console.error('Error fetching NYTimes sections:', error);
      throw error;
    }
  }

}





export default NYTimes;
