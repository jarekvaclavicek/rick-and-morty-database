import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export interface UrlParams {
  page: number;
}

export const useUrlParams = (): [UrlParams, (params: UrlParams) => void] => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1");
  const [params, setParams] = useState<UrlParams>({
    page: currentPage,
  });

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("page", params.page.toString());
    const newPath = `${location.pathname}?${newParams.toString()}`;
    window.history.replaceState(null, "", newPath);
  }, [params, location]);

  const updateParams = (newParams: UrlParams) => {
    setParams(newParams);
  };

  return [params, updateParams];
};
