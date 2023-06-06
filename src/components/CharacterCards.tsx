import React from "react";
import { Link } from "react-router-dom";
import { Image, Card, Group, Text, Flex } from "@mantine/core";

type CharacterType = {
  id: number;
  name: string;
  image: string;
};

type CharacterCardsProps = {
  characters?: CharacterType[];
};

const CharacterCards: React.FC<CharacterCardsProps> = ({ characters }) => {
  return (
    <Flex
      wrap="wrap"
      justify="center"
      align="center"
      gap={30}
      maw="80vw"
      mx="auto"
    >
      {characters?.map((character: CharacterType) => (
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
                <Text weight={500} align="center">
                  {character.name}
                </Text>
              </Group>
            </Card>
          </Link>
        </div>
      ))}
    </Flex>
  );
};

export default CharacterCards;
