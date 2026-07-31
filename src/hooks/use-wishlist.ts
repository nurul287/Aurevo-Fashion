import { useAuth } from "@/contexts/auth-context";
import { trackMetaPixelAddToWishlist } from "@/lib/meta-pixel";
import {
  useAddToWishlist,
  useRemoveWishlistProduct,
  useWishlist,
} from "@/services/wishlist";
import { useMemo } from "react";

/**
 * Unified wishlist interface for product cards and the dashboard page.
 */
export function useWishlistActions() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { data, isLoading, error } = useWishlist(!!user && !authLoading);
  const addMutation = useAddToWishlist();
  const removeMutation = useRemoveWishlistProduct();

  const productIds = useMemo(() => {
    const ids = new Set<string>();
    for (const item of data?.items ?? []) {
      if (item.product_id) ids.add(item.product_id);
    }
    return ids;
  }, [data?.items]);

  const isWishlisted = (productId: string) => productIds.has(productId);

  const toggle = async (product: {
    id: string;
    name?: string;
    base_price?: string | number;
  }) => {
    if (!isAuthenticated) {
      throw new Error("AUTH_REQUIRED");
    }

    if (isWishlisted(product.id)) {
      await removeMutation.mutateAsync(product.id);
      return { wishlisted: false as const };
    }

    await addMutation.mutateAsync(product.id);
    trackMetaPixelAddToWishlist({
      productId: product.id,
      productName: product.name,
      value: product.base_price != null ? Number(product.base_price) : undefined,
    });
    return { wishlisted: true as const };
  };

  return {
    items: data?.items ?? [],
    itemCount: data?.itemCount ?? 0,
    productIds,
    isWishlisted,
    toggle,
    isLoading: authLoading || isLoading,
    isToggling: addMutation.isPending || removeMutation.isPending,
    error,
    isAuthenticated,
  };
}
