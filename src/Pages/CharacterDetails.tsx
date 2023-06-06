import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  Text,
  Loader,
  Image,
  Flex,
  Grid,
  Col,
  Card,
  ScrollArea,
  Button,
  MediaQuery,
} from "@mantine/core";
import { fetchCharacter, fetchEpisode } from "../api/api";


const CharacterDetails = () => {
  const { characterId } = useParams();

  // Fetch character data using react-query
  const { data: character, isLoading } = useQuery(
    ["character", characterId],
    () => fetchCharacter(characterId || "")
  );

  // State for storing episodes
  const [episodes, setEpisodes] = useState<any[]>([]);

  // Fetch episodes when character data is available
  useEffect(() => {
    if (character) {
      Promise.all(
        character.episode.map((episodeUrl) => {
          const episodeId = episodeUrl.split("/").pop();
          return fetchEpisode(episodeId || "");
        })
      ).then((data) => {
        setEpisodes(data);
      });
    }
  }, [character]);

  if (isLoading || !character) {
    return <Loader />;
  }

  const locationId = character.location.url.split("/").pop();

  const goBack = () => {
    window.history.back();
  };

  // Layout for single episode
  const singleEpisodeLayout = (
    <Flex justify="start" direction="column" mt="5vh">
      <Text mb={10}>
        <strong>Episode:</strong>
      </Text>
      {episodes.map((episode) => (
        <Card
          shadow="xs"
          padding="sm"
          radius="md"
          withBorder
          key={episode.id}
          mb={10}
        >
          <Link
            to={`/episodes/${episode.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Text>{episode.name}</Text>
          </Link>
        </Card>
      ))}
    </Flex>
  );

  // Layout for multiple episodes
  const multipleEpisodesLayout = (
    <Col span={episodes.length === 1 ? 12 : 6}>
      <Card padding="md" mr="xl" radius="xl" withBorder={episodes.length > 1}>
        <Text mb={10}>
          <strong>Episodes:</strong>
        </Text>
        <ScrollArea
          offsetScrollbars
          h="70vh"
          styles={(theme) => ({
            scrollbar: {
              '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                backgroundColor: theme.colors.blue[6],
              },
              '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                backgroundColor: theme.colors.blue[6],
              },
            },
          })}
        >
          <Grid gutter="md">
            {episodes.map((episode) => (
              <Col span={12} sm={6} key={episode.id}>
                <Card shadow="xs" padding="sm" radius="md" withBorder>
                  <Link
                    to={`/episodes/${episode.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Text>{episode.name}</Text>
                  </Link>
                </Card>
              </Col>
            ))}
          </Grid>
        </ScrollArea>
      </Card>
    </Col>
  );

  return (
    <MediaQuery
      smallerThan="sm"
      styles={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        gutter="lg"
        my="auto"
        style={{
          justifyContent: episodes.length === 1 ? "center" : "flex-start",
        }}
      >
        <Col span={6}>
          <Flex justify="center" align="center" direction="column" gap={10}>
            <h2>{character.name}</h2>
            <Image
              maw={280}
              mx="auto"
              radius="xl"
              src={character.image}
              alt={character.name}
            />
            <Text size="xl">
              <strong>Species:</strong> {character.species}
            </Text>
            <Text size="xl">
              <strong>Gender:</strong> {character.gender}
            </Text>
            <Text size="xl">
              <strong>Status:</strong> {character.status}
            </Text>
            <Card shadow="sm" padding="sm" radius="sm" withBorder>
              <Link
                to={`/locations/${locationId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Text>
                  <strong>Location:</strong> {character.location.name}
                </Text>
              </Link>
            </Card>
            <Button onClick={goBack} mt={5}>
              Back
            </Button>
          </Flex>
        </Col>
        {episodes.length === 1 ? singleEpisodeLayout : multipleEpisodesLayout}
      </Grid>
    </MediaQuery>
  );
};

export default CharacterDetails;
