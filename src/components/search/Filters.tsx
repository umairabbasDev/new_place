import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Filters } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { userDataSelector } from "../../redux/features/userPrefSlice";
import MultiSelectDropdown from "./dropdown";

interface FilterProps {
  onFilter: (filters: Filters) => void;
  isLoading: boolean;
}

const SearchFilter = (props: FilterProps, ref: any) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { onFilter, isLoading }: FilterProps = props;
  const [fromDateFilter, setFromDateFilter] = useState<string>("");
  const [toDateFilter, setToDateFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [keywordFilter, setKeywordFilter] = useState<string>("");

  useImperativeHandle(ref, () => ({
    handleClick: () => {
      btnRef.current?.click();
    },
  }));

  const userData = useAppSelector(userDataSelector);

  const handleFilter = () => {
    const selectedFilters: Filters = {
      fromDate: fromDateFilter,
      toDate: toDateFilter,
      category: categoryFilter,
      source: sourceFilter,
      keyword: keywordFilter,
    };
    onFilter(selectedFilters);
  };

  return (
    <div className="flex m-5 xl:flex-row items-end  justify-center flex-col">
      <div className="grid gap-x-8 gap-y-4 xl:grid-cols-4 grid-cols-2 items-end justify-end">
        {/* Date Filter */}
        <div className="flex items-start flex-col flex-none w-100">
          <label htmlFor="dateFilter" className="mr-2">
            From Date:
          </label>

          <input
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setFromDateFilter(e.target.value)}
          />
        </div>
        <div className="flex items-start flex-col flex-none w-100">
          <label htmlFor="dateFilter" className="mr-2">
            To Date:
          </label>

          <input
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setToDateFilter(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <MultiSelectDropdown
          formFieldName={"categories"}
          options={userData.category}
          onChange={(e: any) => {
            // console.log("list :", e);
            setCategoryFilter(e);
          }}
          prompt="Categories"
        />

        {/* source Filter */}
        <MultiSelectDropdown
          formFieldName={"sources"}
          options={userData.source}
          onChange={(e: any) => {
            // console.log("list :", e);
            setSourceFilter(e);
          }}
          prompt="Sources"
        />

        {/* Source Filter */}
        <div className="flex items-start flex-col flex-none w-100">
          <label htmlFor="sourceFilter" className="mr-2">
            keyword:
          </label>

          <input
            type="text"
            placeholder="keyword ... "
            value={keywordFilter}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setKeywordFilter(e.target.value)}
          />
        </div>

        {/* Filter Button */}
      </div>

      <button
        className="btn btn-accent  text-white px-4 py-1 rounded  xl:mt-0 mt-5 ms-5"
        ref={btnRef}
        {...props}
        onClick={handleFilter}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <span>Search</span>
        )}
      </button>
    </div>
  );
};

export default forwardRef(SearchFilter);
