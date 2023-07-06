import { useKeyboardBottomInset } from "@/hooks/useKeyboardBottomInset";
import { useProspectRestaurantMutation } from "@/hooks/useRestaurantsQuery";
import { Actionsheet, AddIcon, Button, Fab, FormControl, Input, Stack, useDisclose, useToast } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export function CreateProspect() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const mutation = useProspectRestaurantMutation();

  const toast = useToast();

  const createProspect = async () => {
    const data = await mutation.mutateAsync({ name, comment });

    if (data) {
      setName("");
      setComment("");

      toast.show({
        title: "Prospect créé avec succès",
      });
      onClose();
      return;
    }

    toast.show({
      title: "Une erreur est survenue",
    });
  };

  const onNameChange = useCallback((text) => {
    setName(text);
  }, []);
  const onCommentChange = useCallback((text) => {
    setComment(text);
  }, []);

  const keyboardinset = useKeyboardBottomInset();
  const bottomAni = useRef(new Animated.Value(keyboardinset)).current;

  useEffect(() => {
    Animated.timing(bottomAni, {
      toValue: keyboardinset,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [keyboardinset]);

  return (
    <>
      <Fab icon={<AddIcon />} onPress={onOpen} colorScheme="darkBlue"></Fab>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Animated.View style={{ width: "100%", bottom: bottomAni }}>
          <Actionsheet.Content p={4}>
            <FormControl>
              <Stack>
                <FormControl.Label>Nommez votre prospect</FormControl.Label>
                <Input value={name} onChangeText={onNameChange} isRequired bgColor="gray.100" p={2} />
              </Stack>
              <Stack>
                <FormControl.Label>Description</FormControl.Label>
                <Input
                  multiline
                  value={comment}
                  onChangeText={onCommentChange}
                  isRequired
                  bgColor="gray.100"
                  minH={100}
                />
              </Stack>

              <Button
                isLoading={mutation.isLoading}
                size="xs"
                mt={4}
                onPress={createProspect}
                colorScheme={name && name.length && comment && comment.length ? "darkBlue" : "muted"}
                disabled={!name || !name.length || mutation.isLoading}
              >
                Créer
              </Button>
            </FormControl>
          </Actionsheet.Content>
        </Animated.View>
      </Actionsheet>
    </>
  );
}
