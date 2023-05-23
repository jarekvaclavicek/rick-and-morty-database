import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { Text, Loader, Flex, Image, Grid, Card, Group } from "@mantine/core";
import { fetchCharacter, fetchLocation } from "../api/api";

const LocationDetails = () => {
  const { locationId } = useParams();

  const { data: location, isLoading } = useQuery(["location", locationId], () =>
    fetchLocation(locationId || "")
  );

  const { data: residents, isLoading: isResidentsLoading } = useQuery(
    ["residents", location?.residents],
    async () => {
      const characterIds = location?.residents.map((resident: string) =>
        resident.split("/").pop()
      );
      const characterPromises = characterIds.map((characterId: string) =>
        fetchCharacter(characterId)
      );
      const characters = await Promise.all(characterPromises);
      return characters;
    },
    { enabled: Boolean(location?.residents) }
  );

  if (isLoading || isResidentsLoading) {
    return <Loader />;
  }

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      gap="sm"
      w="60vw"
      mx="auto"
    >
      <h2>{location.name}</h2>
      <Text>
        <strong>Type:</strong> {location.type}
      </Text>
      <Text>
        <strong>Dimension:</strong> {location.dimension}
      </Text>
      <Text>
        <strong>Residents:</strong>
      </Text>
      {residents?.length === 0 ? (
        <Text align="center">!!! Nothing found</Text>
      ) : residents?.length === 1 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link
            to={`/characters/${residents[0].id}`}
            style={{ textDecoration: "none" }}
          >
            <Card padding="sm" radius="sm" withBorder={false}>
              <Card.Section>
                <Image
                  maw={240}
                  mx="auto"
                  radius="md"
                  src={residents[0].image}
                  alt={residents[0].name}
                />
              </Card.Section>
              <Group position="center" mt="md" mb="xs">
                <Text weight={500} align="center">
                  {residents[0].name}
                </Text>
              </Group>
            </Card>
          </Link>
        </div>
      ) : (
        <Grid>
          {residents?.map((character: any) => (
            <Grid.Col span={4} key={character.id}>
              <Link
                to={`/characters/${character.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card padding="sm" radius="sm" withBorder={false}>
                  <Card.Section>
                    <Image
                      maw={240}
                      mx="auto"
                      radius="md"
                      src={character.image}
                      alt={character.name}
                    />
                  </Card.Section>
                  <Group position="center" mt="md" mb="xs">
                    <Text weight={500} align="center">
                      {character.name}
                    </Text>
                  </Group>
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default LocationDetails;
