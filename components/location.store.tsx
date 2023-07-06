import * as Location from "expo-location";
import { PrimitiveAtom, atom, useAtom } from "jotai";
import { useEffect } from "react";

const locationAtom = atom<Location.LocationObject | null>(
  null
) as PrimitiveAtom<Location.LocationObject | null>;

async function hasUserGrantedPermissions() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

async function watchLocation(
  setLocation: (location: Location.LocationObject) => void
) {
  const hasPermissions = await hasUserGrantedPermissions();

  if (hasPermissions) {
    const location = await Location.getCurrentPositionAsync({});

    setLocation(location);

    return await Location.watchPositionAsync({}, (location) =>
      setLocation(location)
    );
  }
}

export function useLocation() {
  const [location, setLocation] = useAtom(locationAtom);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    watchLocation(setLocation).then((s) => (subscription = s));

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return location;
}
