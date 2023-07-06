import { useQuery } from "react-query";
import { getBaseUrl } from "../getBaseUrl";

export interface Category {
  id: string;
  name: string;
}

export function useCategoriesQuery() {
  return useQuery(["categories"], async (): Promise<Category[]> => {
    const res = await fetch(getBaseUrl() + "/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data;
  });
}
