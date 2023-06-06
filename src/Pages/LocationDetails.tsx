import { useParams, Link } from "react-router-dom";
import { Text, Loader, Flex, Image, Card, Group, Button } from "@mantine/core";
import { fetchCharacter, fetchLocation } from "../api/api";
import CharacterCards from "../components/CharacterCards";
import { useFetchData, useFetchMultipleData } from "../hooks/useFetchData";

const LocationDetails = () => {
  const { locationId } = useParams<{ locationId: string }>();

  // Fetch location and residents using custom hook
  const { data: location, isLoading: locationLoading } = useFetchData(
    "location",
    locationId || "",
    fetchLocation
  );
  const { data: residents, isLoading: residentsLoading } = useFetchMultipleData(
    "residents",
    location?.residents,
    fetchCharacter
  );

  if (locationLoading || residentsLoading) {
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
        <CharacterCards characters={residents} />
      )}
      <Button onClick={goBack} mb={15}>
        Back
      </Button>
    </Flex>
  );
};

export default LocationDetails;
