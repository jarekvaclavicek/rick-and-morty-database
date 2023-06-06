import { useQuery } from "react-query";
import { fetchCharacters } from "../api/api";

const useFetchCharacters = (page: number, searchText: string, statusFilter: string) => {
  const { data, isLoading } = useQuery(
    ["characters", page, searchText, statusFilter],
    () => fetchCharacters(page, searchText, statusFilter),
    {
      keepPreviousData: true,
    }
  );

  return { data, isLoading };
};

export default useFetchCharacters;