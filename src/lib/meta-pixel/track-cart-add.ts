import type { QueryClient } from "@tanstack/react-query";
import { isMetaPixelEnabled, trackMetaPixelAddToCartFromCart } from "./client";
import {
  cartQueryKeys,
  fetchCartData,
  type CartData,
} from "@/services/cart/use-cart-query";

/**
 * Fire AddToCart using the React Query cart cache when fresh, otherwise one
 * shared fetch — never a second ad-hoc GET /cart after the mutation refetch.
 */
export async function trackMetaPixelAddToCartAfterChange(
  queryClient: QueryClient,
  userId?: string,
  sessionId?: string,
): Promise<void> {
  if (!isMetaPixelEnabled()) return;
  if (!userId && !sessionId) return;

  try {
    const cart = await queryClient.fetchQuery<CartData>({
      queryKey: cartQueryKeys.all(userId || "", sessionId),
      queryFn: () => fetchCartData(userId, sessionId),
      // Mutation onSuccess already refetched; reuse that result.
      staleTime: 5_000,
    });
    if (cart.items.length > 0) {
      trackMetaPixelAddToCartFromCart(cart.items);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("[meta-pixel] Could not load cart for AddToCart", error);
    }
  }
}
