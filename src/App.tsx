import { MantineProvider } from "@mantine/core";
import Characters from "./Pages/Characters";
import CharacterDetails from "./components/CharacterDetails";
import { QueryClientProvider, queryClient } from "./queryClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationHeader from "./components/NavigationHeader";
import Locations from "./Pages/Locations";
import LocationDetails from "./components/LocationDetails";
import Episodes from "./Pages/Episodes";
import EpisodeDetails from "./components/EpisodeDetails";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <NavigationHeader />
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route
              path="/characters/:characterId"
              element={<CharacterDetails />}
            />
            <Route path="/locations" element={<Locations />} />
            <Route
              path="/locations/:locationId"
              element={<LocationDetails />}
            />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/episodes/:episodeId" element={<EpisodeDetails />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}
