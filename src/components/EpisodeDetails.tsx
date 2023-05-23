import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { Text, Loader, Flex, Image, Grid, Card, Group } from "@mantine/core";
import { fetchEpisode, fetchCharacter } from "../api/api";

const EpisodeDetails = () => {
  const { episodeId } = useParams();

  const { data: episode, isLoading } = useQuery(["episode", episodeId], () =>
    fetchEpisode(episodeId || "")
  );

  const { data: characters, isLoading: isCharactersLoading } = useQuery(
    ["characters", episode?.characters],
    async () => {
      const characterIds = episode?.characters.map((character: string) =>
        character.split("/").pop()
      );
      const characterPromises = characterIds.map((characterId: string) =>
        fetchCharacter(characterId)
      );
      const characters = await Promise.all(characterPromises);
      return characters;
    },
    { enabled: Boolean(episode?.characters) }
  );

  if (isLoading || isCharactersLoading) {
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
      <h2>{episode.name}</h2>
      <Text>
        <strong>Episode:</strong> {episode.episode}
      </Text>
      <Text>
        <strong>Air Date:</strong> {episode.air_date}
      </Text>
      <Text>
        <strong>Characters:</strong>
      </Text>
      <Grid>
        {characters?.map((character: any) => (
          <Grid.Col span={4} key={character.id}>
            <Link
              to={`/characters/${character.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card padding="sm" radius="sm">
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
    </Flex>
  );
};

export default EpisodeDetails;
