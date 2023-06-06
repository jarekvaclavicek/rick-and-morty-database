import { useParams, } from "react-router-dom";
import { Text, Loader, Flex, Button } from "@mantine/core";
import { fetchEpisode, fetchCharacter } from "../api/api";
import CharacterCards from "../components/CharacterCards";
import { useFetchData, useFetchMultipleData } from "../hooks/useFetchData";


const EpisodeDetails = () => {
  const { episodeId } = useParams();

  // Fetch episode and multiple characters using custom hook
  const { data: episode, isLoading: episodeLoading } = useFetchData("episode", episodeId || "", fetchEpisode);
  const { data: characters, isLoading: charactersLoading } = useFetchMultipleData("characters", episode?.characters, fetchCharacter);


  if (episodeLoading || charactersLoading) {
    return <Loader />;
  }

  const goBack = () => {
    window.history.back();
  };

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
      <CharacterCards characters={characters} />
      <Button onClick={goBack} mb={15}>
        Back
      </Button>
    </Flex>
  );
};

export default EpisodeDetails;
