import { useQuery } from "react-query";
import { useState } from "react";
import { fetchLocations } from "../api/api";
import { Card, Text, Group, Flex, Pagination, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import { Location } from "../api/api.types";

const Locations = () => {
  const [activePage, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery(["locations", activePage], () =>
    fetchLocations(activePage)
  );

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <>
          <Flex
            wrap="wrap"
            justify="center"
            align="center"
            gap={30}
            maw="85vw"
            mx="auto"
          >
            {data.results.map((location: Location) => (
              <div key={location.id}>
                <Link
                  to={`/locations/${location.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card shadow="sm" padding="sm" mb={25} radius="sm" withBorder>
                    <Group position="apart" mt="md" mb="xs">
                      <Text weight={500}>{location.name}</Text>
                    </Group>
                  </Card>
                </Link>
              </div>
            ))}
          </Flex>
          <Flex justify="center" align="center" mih="40vh">
            <Pagination
              value={activePage}
              onChange={setPage}
              total={data.info.pages}
            />
          </Flex>
        </>
      )}
    </div>
  );
};

export default Locations;
