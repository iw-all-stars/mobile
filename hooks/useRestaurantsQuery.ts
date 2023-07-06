import { useLocation } from "@/components/location.store";
import { useFilters } from "@/components/map/filters/mapFilters.store";
import { Restaurant } from "@/components/map/markers/RestaurantMarker";
import { useAuth0 } from "react-native-auth0";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getBaseUrl } from "../getBaseUrl";

export function useRestaurantsQuery() {
  const location = useLocation();

  const { filters } = useFilters();

  const { getCredentials } = useAuth0();

  function buildQueryParams() {
    const params = new URLSearchParams();
    if (location) {
      params.append("latitude", location.coords.latitude.toString());
      params.append("longitude", location.coords.longitude.toString());
    }

    if (filters.category) params.append("categoryId", filters.category);
    if (filters.name) params.append("name", filters.name);
    if (filters.distance && filters.withDistance) params.append("radius", filters.distance.toString());

    return params;
  }

  return useQuery(["restaurants", location, filters], async (): Promise<Restaurant[]> => {
    const credentials = await getCredentials();

    const res = await fetch(getBaseUrl() + "/api/restaurants?" + buildQueryParams().toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + credentials.accessToken,
      },
    });

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    return data || [];
  });
}

export function useDeleteProspectRestaurantMutation() {
  const queryClient = useQueryClient();
  const { getCredentials } = useAuth0();

  return useMutation(
    async ({ id }: { id: string }) => {
      const credentials = await getCredentials();

      const res = await fetch(getBaseUrl() + "/api/restaurants", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + credentials.accessToken,
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!res.ok) throw new Error("Something went wrong");

      return id;
    },
    { onSuccess: () => queryClient.invalidateQueries("restaurants") }
  );
}

export function useProspectRestaurantMutation() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { getCredentials } = useAuth0();

  return useMutation(
    async ({ name, comment }: { name: string; comment?: string }) => {
      const credentials = await getCredentials();
      const res = await fetch(getBaseUrl() + "/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + credentials.accessToken,
        },
        body: JSON.stringify({
          name,
          comment,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      });

      if (res.status !== 201) throw new Error("Something went wrong");

      const data = await res.json();
      return data;
    },
    { onSuccess: () => queryClient.invalidateQueries("restaurants") }
  );
}
