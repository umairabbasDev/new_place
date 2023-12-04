import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NYTimes from "@services/apis/NYTimes";
import Guardian from "@services/apis/guardian";
import NEWSAPI from "@services/apis/newsApi";
import { RootState } from "../store";
import { UserPrefState, UserPreferences } from "../../types";
import { toggleTag } from "@utils/index";



export const initialState: UserPrefState = {
  userData: {
    isVisited: false,
    category: [],
    lang: 'en',
    country: 'us',
    source: [],
  },
  categoryList: [],
  sourceList: [],
  status: "idle",
  error: null
};

export const getSourceAction = createAsyncThunk(
  "get/sources",
  async (country: string) => {
    try {
      const [NEWSAPISources] = await Promise.all([NEWSAPI.sources(country)]);
      return {
        data: NEWSAPISources,
        success: true,
        code: 200,
      };
    } catch (error: any) {
      console.error("An error occurred while fetching Sources:", error);
    }
  }
);


export const getCategoryAction = createAsyncThunk(
  "get/categories",
  async () => {
    try {
      const [guardianCategory, NYTimesCategory] = await Promise.all([
        Guardian.category(),
        NYTimes.category(),
      ]);
      const mixedCategory: any[] = [...guardianCategory, ...NYTimesCategory];
      return {
        data: mixedCategory,
        success: true,
        code: 200,
      };
    } catch (error: any) {
      console.error("An error occurred while fetching categories:", error);
    }
  }
);

const userPrefSlice = createSlice({
  name: "userPref",
  initialState,
  reducers: {

    getUserLang: (state, { payload }: PayloadAction<string>) => {
      state.userData.lang = payload
    },


    getUserCountry: (state, { payload }: PayloadAction<string>) => {
      state.userData.country = payload
    },


    getUserCategory: (state, { payload }: PayloadAction<string>) => {
      const updatedList = toggleTag(payload, state.userData.category)
      state.userData.category = updatedList
    },
    getUserSource: (state, { payload }: PayloadAction<string>) => {
      const updatedList = toggleTag(payload, state.userData.source)
      state.userData.source = updatedList
    },

    modalHandler: (state, { payload }: PayloadAction<boolean>) => {
      state.userData.isVisited = payload
    },

    setUserData: (state, { payload }: PayloadAction<UserPreferences>) => {
      state.userData = payload
    }



  },
  extraReducers(builder) {
    builder.addCase(getSourceAction.pending, (state, action) => {
      state.status = "loading";
      console.log("loading action action :", action);


    });
    builder.addCase(getSourceAction.fulfilled, (state, action: any) => {
      state.status = "success";
      state.sourceList = action.payload.data
    });
    builder.addCase(getSourceAction.rejected, (state, action) => {
      state.status = "fail";
      console.log("fail action :", action);

    });

    // category reducer
    builder.addCase(getCategoryAction.pending, (state, action) => {
      state.status = "loading";
      console.log("loading action action :", action);

    });
    builder.addCase(getCategoryAction.fulfilled, (state, action: any) => {
      state.status = "success";
      state.categoryList = action.payload.data
    });
    builder.addCase(getCategoryAction.rejected, (state, action) => {
      state.status = "fail";
      console.log("fail action :", action);

    });
  },
});
export default userPrefSlice.reducer;

export const { getUserLang,
  getUserCategory,
  getUserSource,
  modalHandler,
  setUserData,
  getUserCountry
} = userPrefSlice.actions;

// selector section
export const sourceListSelector = (state: RootState) => state.userPref.sourceList;
export const categoryListSelector = (state: RootState) => state.userPref.categoryList;

export const userDataSelector = (state: RootState) => state.userPref.userData;

export const userLangSelector = (state: RootState) => state.userPref.userData.lang;
export const userCountrySelector = (state: RootState) => state.userPref.userData.country;

