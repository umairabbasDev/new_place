import {
  useNavigate,
  createSearchParams,
  URLSearchParamsInit,
} from "react-router-dom";

interface Params {
  [key: string]: string | number | boolean;
}

const useNavigateWithParams = () => {
  const navigate = useNavigate();

  const navigateWithParams = (pathname: string, params: Params) => {
    if (typeof params !== "object" || params === null) {
      console.error("Params must be an object.");
      return;
    }

    const search = createSearchParams(params as URLSearchParamsInit);

    navigate({ pathname, search: `?${search}` });
  };

  return navigateWithParams;
};

export default useNavigateWithParams;
