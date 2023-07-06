import { Center, Divider, Stack, Text } from "native-base";
import React from "react";
import AroundMe from "./AroundMe";
import { NameAndCategory } from "./NameAndCategory";

export const MapFilters = () => {
  return (
    <Stack borderBottomWidth="2" borderColor="darkBlue.600" space={2} p={4} pb={8} mb={-4}>
      <Center>
        <Text>Filtrer les restaurants</Text>
      </Center>

      <NameAndCategory />
      <Divider />
      <AroundMe />
    </Stack>
  );
};

export default MapFilters;
