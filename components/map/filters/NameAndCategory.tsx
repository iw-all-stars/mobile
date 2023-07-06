import { useCategoriesQuery } from "@/hooks/useCategories";
import { debounce } from "lodash";
import { Input, Select } from "native-base";
import { FC, useState } from "react";
import { useFilters } from "./mapFilters.store";

export const NameAndCategory: FC = () => {
  const { setCategory, setName, filters } = useFilters();

  const [localName, setLocalName] = useState(filters.name);

  const categories = useCategoriesQuery();

  const onChangeName = (text: string) => {
    setLocalName(text);
    debounce(setName, 150)(text);
  };

  return (
    <>
      <Input placeholder="Nom du restaurant" mb={2} value={localName} onChangeText={onChangeName} />

      <Select placeholder="Catégorie" onValueChange={setCategory}>
        <Select.Item label="Toutes les catégories" value={null} />
        {categories.data?.map((category) => (
          <Select.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Select>
    </>
  );
};
