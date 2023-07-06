import { Ionicons } from "@expo/vector-icons";
import { Box, Button, Icon, Image, Stack } from "native-base";
import { useAuth0 } from "react-native-auth0";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

export default function SignIn() {
  const { authorize } = useAuth0();

  useProtectedRoute();

  const onPress = async () => {
    try {
      await authorize(
        {
          scope: "openid profile email",
          audience: "https://omaziarz.eu.auth0.com/api/v2/",
        },
        { customScheme: "esgi-pa2" }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack
      safeArea
      alignItems="center"
      h="full"
      px={10}
      justifyContent="space-around"
    >
      <Box h="1/2" display="flex" alignItems="center" justifyContent="center">
        <Image alt="logo" source={require("../../assets/logo.png")} />
      </Box>
      <Button
        leftIcon={<Icon as={Ionicons} name="log-in" />}
        onPress={onPress}
        colorScheme="darkBlue"
        w="full"
      >
        Se connecter
      </Button>
    </Stack>
  );
}
