import { useAuth } from "@/contexts/auth-context";
import { useGuestCart } from "@/contexts/guest-cart-context";
import { useToast } from "@/hooks/use-toast";
import { trackMetaPixelAddToCartAfterChange } from "@/lib/meta-pixel";
import {
  cartQueryKeys,
  fetchVariantsAvailableQuantities,
  useAddToCart,
  useCartData,
  useClearCart,
  useRemoveFromCart,
  useUpdateCartItemQuantity,
  type CartData,
} from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

/**
 * Stock check for quantity bumps. Prefer reading the cart panel's batch
 * availability cache (`["inventory","available","batch", "id1,id2"]`) so we
 * don't fire a second single-variant availability request while the drawer
 * is open. Fall back to a one-id fetch only when that cache isn't warm.
 */
async function fetchAvailableUnitsCached(
  queryClient: ReturnType<typeof useQueryClient>,
  variantId: string,
  cartVariantIds: string[],
): Promise<number | null> {
  const sortedKey = [...new Set([...cartVariantIds, variantId].filter(Boolean))]
    .sort()
    .join(",");
  const batchKey = ["inventory", "available", "batch", sortedKey] as const;
  const cached = queryClient.getQueryData<Record<string, number>>(batchKey);
  if (cached && cached[variantId] !== undefined) {
    return cached[variantId] ?? null;
  }

  const map = await queryClient.fetchQuery({
    queryKey: batchKey,
    queryFn: () =>
      fetchVariantsAvailableQuantities(
        sortedKey.length > 0 ? sortedKey.split(",") : [variantId],
      ),
    staleTime: 30 * 1000,
  });
  return map[variantId] ?? null;
}

/**
 * Custom hook that provides a unified cart interface using TanStack Query
 */
export function useCart() {
  const { user, loading: authLoading } = useAuth();
  const { sessionId, openCartPanel } = useGuestCart();
  const queryClient = useQueryClient();
  const { showError } = useToast();

  // Memoize query parameters to prevent unnecessary re-renders
  const queryParams = useMemo(
    () => ({
      userId: user?.id,
      sessionId: user?.id ? undefined : sessionId,
    }),
    [user?.id, sessionId],
  );

  // Wait for auth to resolve before fetching cart to avoid a
  // throwaway guest-key fetch that gets superseded immediately.
  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useCartData(
    authLoading ? undefined : queryParams.userId,
    authLoading ? undefined : queryParams.sessionId,
  );

  // Extract data from the combined query
  const cartItems = cartData?.items || [];
  const cartTotal = cartData?.total || 0;
  const itemCount = cartData?.itemCount || 0;

  // Mutations
  const addToCartMutation = useAddToCart();
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  const addItem = async (
    productId: string,
    variantId: string,
    quantity: number = 1,
    options: { suppressToast?: boolean; trackPixel?: boolean } = {},
  ) => {
    const { suppressToast = false, trackPixel = true } = options;

    // No client-side /inventory/availability pre-check here: add opens the
    // cart panel, which already batches availability for every line item.
    // A separate single-variant fetch was racing that and showed up as a
    // duplicate call. Stock is still enforced by POST /cart/items (422).
    const result = await addToCartMutation.mutateAsync({
      userId: user?.id,
      sessionId: user?.id ? undefined : sessionId,
      productId,
      variantId,
      quantity,
      suppressToast,
    });

    if (trackPixel) {
      await trackMetaPixelAddToCartAfterChange(
        queryClient,
        queryParams.userId,
        queryParams.sessionId,
      );
    }

    openCartPanel();
    return result;
  };

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(itemId);
    }

    const prevCart = queryClient.getQueryData<CartData>(
      cartQueryKeys.all(queryParams.userId || "", queryParams.sessionId),
    );
    const prevQty =
      prevCart?.items.find((item) => item.id === itemId)?.quantity ?? 0;

    if (quantity > prevQty) {
      const line = prevCart?.items.find((item) => item.id === itemId);
      if (line?.variant_id) {
        const cartVariantIds = (prevCart?.items ?? [])
          .map((item) => item.variant_id)
          .filter(Boolean);
        const available = await fetchAvailableUnitsCached(
          queryClient,
          line.variant_id,
          cartVariantIds,
        );
        if (available !== null && quantity > available) {
          showError(
            "Not enough stock",
            `Only ${available} available for this item.`,
          );
          throw new Error("Insufficient inventory");
        }
      }
    }

    const result = await updateQuantityMutation.mutateAsync({
      userId: user?.id,
      sessionId: user?.id ? undefined : sessionId,
      itemId,
      quantity,
    });

    if (quantity > prevQty) {
      await trackMetaPixelAddToCartAfterChange(
        queryClient,
        queryParams.userId,
        queryParams.sessionId,
      );
    }

    return result;
  };

  const removeItem = async (itemId: string) => {
    return removeItemMutation.mutateAsync({
      userId: user?.id,
      sessionId: user?.id ? undefined : sessionId,
      itemId,
    });
  };

  const clearCart = async () => {
    return clearCartMutation.mutateAsync({
      userId: user?.id,
      sessionId: user?.id ? undefined : sessionId,
    });
  };

  return {
    // State
    cartItems,
    cartTotal,
    itemCount,
    loading: cartLoading,
    error: cartError,

    // Actions
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,

    // Mutation states
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
  };
}
