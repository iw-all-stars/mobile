import { Box, Checkbox, HStack, Slider, Text, VStack } from "native-base";
import { useFilters } from "./mapFilters.store";

export const AroundMe = () => {
  const { filters, setDistance, setWithDistance } = useFilters();

  return (
    <VStack space={1}>
      <Checkbox value="filterLocation" isChecked={filters.withDistance} onChange={setWithDistance}>
        Autour de moi
      </Checkbox>

      {filters.withDistance && (
        <HStack space={4}>
          <Box>
            <Text>
              à <Text bold>{filters.distance}</Text> kms
            </Text>
          </Box>

          <Box flex={1}>
            <Slider
              width="100%"
              defaultValue={1}
              minValue={1}
              maxValue={5}
              step={0.5}
              value={filters.distance}
              onChange={setDistance}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Box>
        </HStack>
      )}
    </VStack>
  );
};

export default AroundMe;
