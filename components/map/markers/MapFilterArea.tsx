import { useLocation } from "@/components/location.store";
import { FC } from "react";
import { Circle, LatLng } from "react-native-maps";
import { useFilters } from "../filters/mapFilters.store";

interface MapFilterAreaProps {
  radius: number;
  center: LatLng;
}

export const MapFilterArea: FC = () => {
  const { filters } = useFilters();
  const location = useLocation();

  const radiusInMeters = filters.withDistance ? filters.distance * 1000 ?? 0 : 0;

  return <Circle key={1} radius={radiusInMeters} center={location.coords} strokeColor="blue" />;
};
