import { useKeyboardBottomInset } from "@/hooks/useKeyboardBottomInset";
import { useDeleteProspectRestaurantMutation } from "@/hooks/useRestaurantsQuery";
import { Actionsheet, Box, Button, DeleteIcon, Heading, Stack, Text, useDisclose, useToast } from "native-base";
import { useAuth0 } from "react-native-auth0";
import { Marker } from "react-native-maps";

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  categoryId: string;
  categoryName: string;
  organizationId: string;
  location: [number, number];
  isProspect?: boolean;
  comment?: string;
  createdBy?: string;
}

interface Props {
  restaurant: Restaurant;
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function RestaurantMarker(props: Props) {
  const toast = useToast();
  const { user } = useAuth0();

  const mutation = useDeleteProspectRestaurantMutation();

  const deleteProspect = async () => {
    try {
      await mutation.mutateAsync({ id: props.restaurant._id });
      toast.show({
        title: "Prospect supprimé",
        colorScheme: "success",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclose();
  const keyboardinset = useKeyboardBottomInset();
  return (
    <>
      <Marker
        onPress={onOpen}
        pinColor={props.restaurant.isProspect ? "green" : "red"}
        coordinate={{ latitude: props.restaurant?.location[1], longitude: props.restaurant?.location[0] }}
      ></Marker>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content p={4} bottom={keyboardinset}>
          <Stack space={2}>
            <Box>
              <Heading size="md" textAlign="center">
                {capitalize(props.restaurant?.name)}
              </Heading>
              {props.restaurant.isProspect ? (
                <Heading size="xs" textAlign="center">
                  Prospect
                </Heading>
              ) : (
                <Heading size="xs" textAlign="center">
                  {props.restaurant?.categoryName}
                </Heading>
              )}
            </Box>

            <Text italic>{capitalize(props.restaurant?.address)}</Text>
            <Stack
              space={2}
              borderColor="dark.500"
              borderWidth={1}
              borderRadius="md"
              p={2}
              display={props.restaurant?.comment ? "flex" : "none"}
            >
              <Heading size="xs">Commentaire</Heading>
              <Text>{props.restaurant?.comment}</Text>
            </Stack>

            {props.restaurant?.isProspect && props.restaurant?.createdBy === user?.sub && (
              <Button
                isLoading={mutation.isLoading}
                disabled={mutation.isLoading}
                leftIcon={<DeleteIcon />}
                colorScheme="danger"
                onPress={deleteProspect}
              >
                Supprimer le prospect
              </Button>
            )}
          </Stack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
