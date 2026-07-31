import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  wishlistQueryKeys,
  type WishlistData,
  type WishlistItem,
} from "./use-wishlist-query";

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const { showError } = useToast();

  return useMutation({
    mutationFn: (productId: string) =>
      api.post<WishlistItem>("/wishlist/items", { productId }),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: wishlistQueryKeys.all });
      const previous = queryClient.getQueryData<WishlistData>(wishlistQueryKeys.all);
      if (previous && !previous.items.some((item) => item.product_id === productId)) {
        queryClient.setQueryData<WishlistData>(wishlistQueryKeys.all, {
          items: [
            {
              id: `optimistic-${productId}`,
              user_id: null,
              product_id: productId,
              product: undefined,
            },
            ...previous.items,
          ],
          itemCount: previous.itemCount + 1,
        });
      } else if (!previous) {
        queryClient.setQueryData<WishlistData>(wishlistQueryKeys.all, {
          items: [
            {
              id: `optimistic-${productId}`,
              user_id: null,
              product_id: productId,
            },
          ],
          itemCount: 1,
        });
      }
      return { previous };
    },
    onError: (err: Error, _productId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(wishlistQueryKeys.all, context.previous);
      }
      showError("Could not save", err.message || "Failed to add to wishlist");
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: wishlistQueryKeys.all });
    },
  });
}

export function useRemoveWishlistProduct() {
  const queryClient = useQueryClient();
  const { showError } = useToast();

  return useMutation({
    mutationFn: (productId: string) =>
      api.delete(`/wishlist/products/${productId}`),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: wishlistQueryKeys.all });
      const previous = queryClient.getQueryData<WishlistData>(wishlistQueryKeys.all);
      if (previous) {
        queryClient.setQueryData<WishlistData>(wishlistQueryKeys.all, {
          items: previous.items.filter((item) => item.product_id !== productId),
          itemCount: Math.max(0, previous.itemCount - 1),
        });
      }
      return { previous };
    },
    onError: (err: Error, _productId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(wishlistQueryKeys.all, context.previous);
      }
      showError("Could not update", err.message || "Failed to remove from wishlist");
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: wishlistQueryKeys.all });
    },
  });
}

export function useRemoveWishlistItem() {
  const queryClient = useQueryClient();
  const { showError } = useToast();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/wishlist/items/${id}`),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: wishlistQueryKeys.all });
    },
    onError: (err: Error) => {
      showError("Could not update", err.message || "Failed to remove from wishlist");
    },
  });
}

export function useClearWishlist() {
  const queryClient = useQueryClient();
  const { showError } = useToast();

  return useMutation({
    mutationFn: () => api.delete("/wishlist"),
    onSuccess: () => {
      queryClient.setQueryData<WishlistData>(wishlistQueryKeys.all, {
        items: [],
        itemCount: 0,
      });
    },
    onError: (err: Error) => {
      showError("Could not clear wishlist", err.message);
    },
  });
}
