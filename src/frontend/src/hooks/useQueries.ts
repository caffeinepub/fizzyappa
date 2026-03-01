import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderItem } from "../backend.d";
import { useActor } from "./useActor";

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAvailableCities() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableCities();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      customerName: string;
      customerPhone: string;
      deliveryCity: string;
      deliveryAddress: string;
      items: Array<OrderItem>;
      actor?: typeof actor;
    }) => {
      // Use actor passed at call-time (freshest) or fall back to hook closure
      const liveActor = params.actor ?? actor;
      if (!liveActor)
        throw new Error(
          "Store connection not ready. Please wait a moment and try again.",
        );
      return liveActor.placeOrder(
        params.customerName,
        params.customerPhone,
        params.deliveryCity,
        params.deliveryAddress,
        params.items,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useActorReady() {
  const { actor, isFetching } = useActor();
  return { isReady: !!actor, isConnecting: isFetching };
}
