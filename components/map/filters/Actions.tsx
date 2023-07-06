import { Button, HStack } from "native-base";
import { FC } from "react";
import { useQueryClient } from "react-query";
import { useFilters } from "./mapFilters.store";

export const Actions: FC = () => {
  const { reset } = useFilters();

  const client = useQueryClient();

  const refetch = async () => {
    await client.invalidateQueries(["restaurants"]);
  };
  return (
    <HStack space={2}>
      <Button colorScheme="blueGray" onPress={reset}>
        Reset
      </Button>
      <Button colorScheme="info" onPress={refetch}>
        Rechercher
      </Button>
    </HStack>
  );
};
