import { AxiosResponse } from "axios";
import { GuardianApiResponse, GuardianArticle, GuardianSection, SearchOptions } from "../../types";
import guardianClient from "../Clients/guardianClient";



const Guardian = {
  Headlines: async (language: string) => {
    try {
      const response: AxiosResponse<GuardianApiResponse> = await guardianClient.get("/search", {
        params: {
          "show-fields": "all",
          "lang": language
        },
      });

      return response.data.response.results;
    } catch (error: any) {
      console.error("Error fetching top headlines:", error.message);
      throw error;
    }
  },

  search: async (options: SearchOptions): Promise<GuardianArticle[]> => {
    const { query, fromDate, toDate, category, language } = options;

    const queryParams = [`q=${query}`];

    if (fromDate) {
      queryParams.push(`from-date=${fromDate}`);
    }

    if (toDate) {
      queryParams.push(`to-date=${toDate}`);
    }

    if (category) {
      queryParams.push(`section=${category}`);
    }
    if (language) {
      queryParams.push(`lang=${language}`);
    }


    queryParams.push(`show-fields=all`);

    const fullUrl = `/search?${queryParams.join("&")}`;

    try {
      const response: AxiosResponse<GuardianApiResponse> = await guardianClient.get(fullUrl);
      return response.data.response.results;
    } catch (error: any) {
      console.error("Error fetching articles:", error.message);
      throw error;
    }
  },

  category: async (): Promise<GuardianSection[]> => {
    try {
      const response = await guardianClient.get("/sections");
      return response.data.response.results.map((result: GuardianSection) => ({
        name: result.webTitle,
      }));
    } catch (error) {
      console.error("Error fetching Guardian categories:", error);
      throw error;
    }
  }
}


export default Guardian
