import { useQuery } from "react-query";
import { useState } from "react";
import { fetchCharacters } from "../api/api";
import {
  Card,
  Image,
  Text,
  Group,
  Flex,
  Pagination,
  Loader,
  TextInput,
  Select,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Character } from "../api/api.types";

const Characters = () => {
  const [activePage, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { data, isLoading } = useQuery(
    ["characters", activePage, searchText, statusFilter],
    () => fetchCharacters(activePage, searchText, statusFilter),
    {
      keepPreviousData: true,
    }
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  return (
    <div>
      <Flex justify="center" align="center" gap="xl" mb={10}>
        <TextInput
          radius="md"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search characters"
          variant="filled"
          mb={16}
          w={400}
        />

        <Select
          data={[
            { value: "", label: "All" },
            { value: "Alive", label: "Alive" },
            { value: "Dead", label: "Dead" },
            { value: "unknown", label: "Unknown" },
          ]}
          value={statusFilter}
          onChange={handleStatusFilterChange}
          placeholder="Filter by status"
          variant="filled"
          mb={16}
          radius="md"
        />
      </Flex>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <>
          <Flex
            wrap="wrap"
            justify="center"
            align="center"
            gap={30}
            maw="80vw"
            mx="auto"
          >
            {data.results.map((character: Character) => (
              <div key={character.id}>
                <Link
                  to={`/characters/${character.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card shadow="sm" padding="sm" radius="sm" withBorder>
                    <Card.Section>
                      <Image
                        maw={240}
                        mx="auto"
                        src={character.image}
                        alt={character.name}
                      />
                    </Card.Section>
                    <Group position="center" mt="md" mb="xs">
                      <Text weight={500} size="lg">
                        {character.name}
                      </Text>
                    </Group>
                  </Card>
                </Link>
              </div>
            ))}
          </Flex>
          <Flex justify="center" align="center" my={30}>
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

export default Characters;
