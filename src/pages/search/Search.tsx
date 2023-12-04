import { AList, LoadSkeleton, SearchFilters } from "@comp/index";
import { useSearchParams } from "react-router-dom";
import { Article, Filters, SearchOptions } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import NEWSAPI from "@services/apis/newsApi";
import Guardian from "@services/apis/guardian";
import NYTimes from "@services/apis/NYTimes";
import { mixArrays } from "@utils/index";
import {
  createGuardianApiData,
  createNYApiData,
  createNewsApiData,
} from "../../factory";
import { useEffect, useRef, useState } from "react";
import { userDataSelector } from "../../redux/features/userPrefSlice";

interface refMethods {
  handleClick: () => void;
}

const SearchPage = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { country, lang } = useAppSelector(userDataSelector);

  const [isLoading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState<Article[]>([]);
  const [searchParams] = useSearchParams();
  const q: string = searchParams.get("q") || "";
  
  const handleFilter = async (e: Filters) => {
    setSearchList([]);
    setLoading(true);

    const defaultQuery = "today";
    const searchQuery = q.length > 3 ? q : defaultQuery;

    const searchOptions: SearchOptions = {
      query: e.source || searchQuery,
      fromDate: e.fromDate,
      toDate: e.toDate,
      category: e.category,
      language: lang,
      country: country,
    };

    try {
      const [newsAPIData, guardianData, NYTimesData] = await Promise.all([
        NEWSAPI.search(searchOptions).catch((error) => {
          console.error("Error in NEWSAPI search:", error);
          return [];
        }),
        Guardian.search(searchOptions).catch((error) => {
          console.error("Error in Guardian search:", error);
          return [];
        }),
        NYTimes.search(searchOptions).catch((error) => {
          console.error("Error in NYTimes search:", error);
          return [];
        }),
      ]);

      const mixedArray = mixArrays(
        createNewsApiData(newsAPIData),
        createGuardianApiData(guardianData),
        createNYApiData(NYTimesData)
      );

      setSearchList(mixedArray);
    } catch (error: any) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  const triggerSearch = () => {
    if (q.length > 3) {
      // (btnRef.current as unknown as refMethods).handleClick();
    }
  };

  useEffect(triggerSearch, [q]);

  return (
    <div className="max-w-screen-xl mx-auto min-w-screen-sm-sm xl:px-0 lg:px-8 md:px-6 px-4 flex flex-col justify-center items-center">
      <SearchFilters
        isLoading={isLoading}
        onFilter={handleFilter}
        ref={btnRef}
      />

      <h1>
        {searchList.length > 0 ? `Search Results ${searchList.length}` : ""}
      </h1>

      {isLoading ? (
        <div className="grid gap-x-8 gap-y-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 my-6">
          <LoadSkeleton times={10} />
        </div>
      ) : (
        <AList data={searchList} />
      )}
    </div>
  );
};

export default SearchPage;
