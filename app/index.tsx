import { Logout } from "@/components/Logout";
import { Map } from "@/components/map/Map";
import MapFilters from "@/components/map/filters/MapFilters";
import { CreateProspect } from "@/components/prospect/CreateProspect";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

import { Stack } from "native-base";

export default function App() {
  useProtectedRoute();

  return (
    <Stack safeArea>
      <MapFilters />
      <Map />
      <CreateProspect />
      <Logout />
    </Stack>
  );
}
