import { atom, useAtom } from "jotai";

interface Filters {
  name: string;
  category: string;
  distance: number;
  withDistance: boolean;
}

const defaultFilters: Filters = {
  name: "",
  category: "",
  distance: 5,
  withDistance: false,
};

const filtersAtom = atom<Filters>(defaultFilters);

export const useFilters = () => {
  const [filters, setFilters] = useAtom(filtersAtom);

  const setName = (name: string) => setFilters({ ...filters, name });
  const setCategory = (category: string) => setFilters({ ...filters, category });
  const setDistance = (distance: number) => setFilters({ ...filters, distance });
  const setWithDistance = (withDistance: boolean) => setFilters({ ...filters, withDistance });

  const reset = () => setFilters(defaultFilters);

  return {
    filters,
    reset,
    setName,
    setCategory,
    setDistance,
    setWithDistance,
  };
};
