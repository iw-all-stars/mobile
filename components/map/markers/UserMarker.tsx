import { useLocation } from "@/components/location.store";
import { Marker } from "react-native-maps";

export const UserMarker = () => {
  const location = useLocation();

  if (!location) return null;

  return <Marker description="Moi" pinColor="blue" coordinate={location?.coords} />;
};
