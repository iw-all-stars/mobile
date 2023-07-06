import { QueryProvider } from "@/components/QueryProvider";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Flex, NativeBaseProvider, Pressable } from "native-base";
import { Auth0Provider } from "react-native-auth0";

export default function RootLayout() {
  return (
    <Auth0Provider
      domain={"omaziarz.eu.auth0.com"}
      clientId={"gRJ20yNci3sKOFSrCy1NlyCKin2GszeG"}
    >
      <QueryProvider>
        <NativeBaseProvider>
          <Pressable>
            <Flex flexDirection="column">
              <Slot />
              <StatusBar style="light" />
            </Flex>
          </Pressable>
        </NativeBaseProvider>
      </QueryProvider>
    </Auth0Provider>
  );
}
