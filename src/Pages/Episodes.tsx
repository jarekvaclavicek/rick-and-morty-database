import { useQuery } from "react-query";
import { useState } from "react";
import { fetchEpisodes } from "../api/api";
import { Card, Text, Group, Flex, Pagination, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import { Episode } from "../api/api.types";

const Episodes = () => {
  const [activePage, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery(["episodes", activePage], () =>
    fetchEpisodes(activePage)
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
            w="80vw"
            mx="auto"
          >
            {data.results.map((episode: Episode) => (
              <div key={episode.id}>
                <Link
                  to={`/episodes/${episode.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card shadow="sm" padding="sm" mb={25} radius="sm" withBorder>
                    <Group position="apart" mt="md" mb="xs">
                      <Flex
                        justify="center"
                        align="center"
                        direction="column"
                        gap="sm"
                      >
                        <Text>Episode: {episode.id}</Text>
                        <Text weight={500}>{episode.name}</Text>
                      </Flex>
                    </Group>
                  </Card>
                </Link>
              </div>
            ))}
          </Flex>
          <Flex justify="center" align="center" my="5vh">
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

export default Episodes;
