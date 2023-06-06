import { useQuery } from "react-query";
import { fetchEpisodes } from "../api/api";
import { Flex, Pagination, Loader } from "@mantine/core";
import { useUrlParams } from "../hooks/urlParams";
import { TableComponent } from "../components/TableComponent";

const Episodes = () => {
  const [params, setParams] = useUrlParams();
  const { page } = params;

  const { data, isLoading } = useQuery(["episodes", page], () =>
    fetchEpisodes(page)
  );

  const handlePageChange = (newPage: number) => {
    setParams({ ...params, page: newPage });
  };

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <>
          <TableComponent data={data.results} type="episodes" />
          <Flex justify="center" align="center" mih="18vh">
            <Pagination
              value={page}
              onChange={handlePageChange}
              total={data.info.pages}
            />
          </Flex>
        </>
      )}
    </div>
  );
};

export default Episodes;
