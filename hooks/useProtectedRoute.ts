import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuth0 } from "react-native-auth0";

export function useProtectedRoute() {
  const auth0 = useAuth0();
  const router = useRouter();
  const segments = useSegments();
  const inAuthGroup = segments[0] === "(auth)";

  const navigationState = useRootNavigationState();
  useEffect(() => {
    if (!navigationState?.key) {
      // Temporary fix for router not being ready.
      return;
    }

    if (!auth0.user && !inAuthGroup) {
      router.replace("/signIn");
    } else if (auth0.user && inAuthGroup) {
      router.replace("/");
    }
  }, [segments, navigationState?.key, auth0.user]);
}
