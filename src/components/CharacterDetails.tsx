import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Text, Loader, Image, Flex } from "@mantine/core";
import { fetchCharacter } from "../api/api";

const CharacterDetails = () => {
  const { characterId } = useParams();

  const { data: character, isLoading } = useQuery(
    ["character", characterId],
    () => fetchCharacter(characterId || "")
  );

  if (isLoading || !character) {
    return <Loader />;
  }

  return (
    <Flex justify="center" align="center" direction="column" gap={6}>
      <h2>{character.name}</h2>
      <Image
        maw={240}
        mx="auto"
        radius="md"
        src={character.image}
        alt={character.name}
      />
      <Text>
        <strong>Species:</strong> {character.species}
      </Text>
      <Text>
        <strong>Gender:</strong> {character.gender}
      </Text>
      <Text>
        <strong>Status:</strong> {character.status}
      </Text>
      <Text>
        <strong>Location:</strong> {character.location.name}
      </Text>
    </Flex>
  );
};

export default CharacterDetails;
