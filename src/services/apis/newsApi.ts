import { AxiosResponse } from 'axios';
import { NewsAPIArticle, NewsAPIResponse, NewsAPISource, SearchOptions } from "../../types";
import NEWSAPIClient from "../Clients/NEWSAPIClient";





const NEWSAPI = {
  Headlines: async (country: string, categories: string[]): Promise<NewsAPIArticle[]> => {
    const promises: Promise<AxiosResponse<NewsAPIResponse>>[] = [];
    categories.forEach((category) => {
      const promise = NEWSAPIClient.get("/top-headlines", {
        params: {
          country,
          category,
        },
      });

      promises.push(promise);
    });

    try {
      const responses: AxiosResponse<NewsAPIResponse>[] = await Promise.all(promises);
      const headlines: NewsAPIArticle[] = [];

      responses.forEach((response) => {
        if (response.data.articles) {
          headlines.push(...response.data.articles);
        } else {
          throw new Error('Invalid response format');
        }
      });

      return headlines;
    } catch (error: any) {
      console.error('Error fetching headlines:', error.message);
      throw error;
    }
  },

  search: async (options: SearchOptions): Promise<NewsAPIArticle[]> => {
    const { query, fromDate, toDate, language } = options;

    const queryParams = [`q=${query}`];

    if (fromDate) {
      queryParams.push(`from=${fromDate}`);
    }

    if (toDate) {
      queryParams.push(`to=${toDate}`);
    }

    if (language) {
      queryParams.push(`language=${language}`);
    }



    queryParams.push(`sortBy=relevancy`);


    const fullUrl = `/everything?${queryParams.join('&')}`;

    try {
      const response: AxiosResponse<NewsAPIResponse> = await NEWSAPIClient.get(fullUrl);
      return response.data.articles
    } catch (error: any) {
      console.error('Error fetching articles:', error.message);
      throw error;
    }
  },

  sources: async (country: string = 'us') => {
    try {
      const response = await NEWSAPIClient.get(`/sources`,
        { params: { country } }
      );
      // console.log(response.data);
      return response.data.sources.map((data: NewsAPISource) => ({
        name: data.name
      }));
    } catch (error) {
      console.error(error);
    }
  }

}







export default NEWSAPI
