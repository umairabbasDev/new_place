import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getUserLang,
  userCountrySelector,
  userLangSelector,
  getUserCountry,
} from "../../redux/features/userPrefSlice";
import { staticData } from "@config/index";
import { CountryType, LanguageType } from "../../types";

const Language = () => {
  const dispatch = useAppDispatch();
  // modalHandler
  const userLang = useAppSelector(userLangSelector);
  const userCountry = useAppSelector(userCountrySelector);

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <h3 className="font-extrabold text-lg">set your origin Preferences </h3>

      <div className="flex items-start flex-col flex-none w-100">
        <label htmlFor="categoryFilter" className="mr-2">
          language:
        </label>
        <select
          id="categoryFilter"
          className="select select-bordered w-full max-w-xs"
          value={userLang}
          onChange={(e) => dispatch(getUserLang(e.target.value))}
        >
          <option value="">select Language</option>
          {staticData.languages.map((data: LanguageType) => (
            <option key={data.key} value={data.key}>
              {data.value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start flex-col flex-none w-100">
        <label htmlFor="categoryFilter" className="mr-2">
          country:
        </label>
        <select
          id="categoryFilter"
          className="select select-bordered w-full max-w-xs"
          value={userCountry}
          onChange={(e) => dispatch(getUserCountry(e.target.value))}
        >
          <option value="">select country</option>
          {staticData.countries.map((data: CountryType) => (
            <option key={data.key} value={data.key}>
              {data.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Language;
