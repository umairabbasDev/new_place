import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Guardian from "@services/apis/guardian";
import NEWSAPI from "@services/apis/newsApi";
import { mixArrays, parseISODate } from "@utils/index";
import { createGuardianApiData, createNewsApiData } from "../../factory";
import { RootState } from "../store";
import { Article, SearchOptions } from "../../types";

interface HeadlineState {
  headLines: Article[];
  pagination: any;
  status: string;
  error: null | string;
}

export const initialState: HeadlineState = {
  headLines: [],
  pagination: {
    currentPage: 0,
    perPage: 0,
    total: 0,
    lastPage: 0,
    firstPageUrl: "",
    lastPageUrl: "",
    nextPageUrl: "",
    previousPageUrl: "",
  },
  status: "idle",
  error: null,
};

export const getHeadlineAction = createAsyncThunk(
  "get/headLines",
  async (userPref: SearchOptions) => {
    try {
      const [newsAPIData, guardianData] = await Promise.all([
        NEWSAPI.Headlines(userPref.country as string, userPref.category as string[]),
        Guardian.Headlines(userPref.language as string),
        // NYTimes.Headlines(["science"]),
      ]);
      const mixedArray = mixArrays(
        createNewsApiData(newsAPIData),
        createGuardianApiData(guardianData),
        // createNYApiData(NYTimesData)
      );

      console.log("mixedArray : ", mixedArray);
      return {
        data: mixedArray.sort((a, b) => parseISODate(b.pub_date).getTime() - parseISODate(a.pub_date).getTime()),
        success: true,
        code: 200,
      };
    } catch (error: any) {
      console.error("An error occurred while fetching data:", error);
    }
  }
);

const headlineSlice = createSlice({
  name: "headline",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getHeadlineAction.pending, (state) => {
      state.status = "loading";

    });
    builder.addCase(getHeadlineAction.fulfilled, (state, action: any) => {
      state.status = "success";
      state.headLines = action.payload.data
    });
    builder.addCase(getHeadlineAction.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const headlinesListSelector: any = (state: RootState) => state.headline.headLines;

export const statusSelector: any = (state: any) => state.appointments.status;

export default headlineSlice.reducer;
