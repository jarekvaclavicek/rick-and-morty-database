import { useUrlParams } from "../hooks/urlParams";
import { Flex, Pagination, Loader } from "@mantine/core";
import useCharacterSearch from "../hooks/useCharacterSearch";
import useFetchCharacters from "../hooks/useFetchCharacters";
import SearchAndFilter from "../components/SearchAndFilter";
import CharacterCards from "../components/CharacterCards";

const Characters = () => {
  const [params, setParams] = useUrlParams();
  const { page } = params;

  // Custom hook to search and filter 
  const {
    searchText,
    statusFilter,
    handleSearchChange,
    handleStatusFilterChange,
  } = useCharacterSearch();

  // Custom hook to fetch characters
  const { data, isLoading } = useFetchCharacters(
    page,
    searchText,
    statusFilter
  );

  // Page change and update URL parameters
  const handlePageChange = (newPage: number) => {
    setParams({ ...params, page: newPage });
  };

  return (
    <div>
      <Flex justify="center" align="center" gap="xl" mb={10}>
        <SearchAndFilter
          searchText={searchText}
          handleSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          handleStatusFilterChange={handleStatusFilterChange}
        />
      </Flex>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data && 'results' in data &&  <CharacterCards characters={data.results} />}
          {data && 'results' in data && data.info && (
            <Flex justify="center" align="center" my={30}>
              <Pagination
                value={page}
                onChange={handlePageChange}
                total={data.info.pages}
              />
            </Flex>
          )}
        </>
      )}
    </div>
  );
};

export default Characters;
