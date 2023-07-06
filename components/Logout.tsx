import { Ionicons } from "@expo/vector-icons";
import { Fab, Icon } from "native-base";
import { useAuth0 } from "react-native-auth0";
export function Logout() {
  const { clearSession } = useAuth0();
  async function logout() {
    await clearSession({ customScheme: "esgi-pa2" });
  }

  return (
    <Fab
      onPress={logout}
      colorScheme="danger"
      placement="bottom-left"
      icon={<Icon as={Ionicons} name="log-out" />}
    ></Fab>
  );
}
