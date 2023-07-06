import { Box, Spinner } from "native-base";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { useLocation } from "@/components/location.store";
import { useRestaurantsQuery } from "@/hooks/useRestaurantsQuery";
import { MapFilterArea } from "./markers/MapFilterArea";
import { RestaurantMarker } from "./markers/RestaurantMarker";
import { UserMarker } from "./markers/UserMarker";

export const Map = () => {
  const location = useLocation();

  // @ts-ignore

  const restaurants = useRestaurantsQuery();

  if (!location) return null;

  return (
    <Box overflow="hidden" bg="white">
      <MapView
        style={styles.map}
        initialRegion={{
          ...location.coords,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {restaurants.data?.map((restaurant) => (
          <RestaurantMarker key={restaurant._id} restaurant={restaurant} />
        ))}

        <UserMarker />
        <MapFilterArea />
      </MapView>
      <Spinner
        position="absolute"
        left={3}
        height={10}
        color="dark.50"
        display={restaurants.isLoading || restaurants.isFetching ? "flex" : "none"}
      ></Spinner>
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
});
