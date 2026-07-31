import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface WishlistProductVariant {
  id: string;
  product_id?: string | null;
  name?: string | null;
  size?: string | null;
  color?: string | null;
  price?: string | number | null;
  compare_at_price?: string | number | null;
  stock?: number | null;
  is_active?: boolean | null;
  sort_order?: number | null;
}

export interface WishlistProduct {
  id: string;
  name: string;
  slug: string;
  base_price: string | number;
  compare_at_price?: string | number | null;
  is_active?: boolean | null;
  images?: Array<{
    product_id?: string | null;
    url: string;
    is_primary?: boolean | null;
    sort_order?: number | null;
  }>;
  variants?: WishlistProductVariant[];
}

export interface WishlistItem {
  id: string;
  user_id: string | null;
  product_id: string | null;
  created_at?: string | null;
  product?: WishlistProduct;
}

export interface WishlistData {
  items: WishlistItem[];
  itemCount: number;
}

export const wishlistQueryKeys = {
  all: ["wishlist"] as const,
};

type BeWishlistResponse = {
  items: WishlistItem[];
  item_count: number;
};

export async function fetchWishlist(): Promise<WishlistData> {
  const data = await api.get<BeWishlistResponse>("/wishlist");
  return {
    items: data?.items ?? [],
    itemCount: data?.item_count ?? 0,
  };
}

export function useWishlist(enabled = true) {
  return useQuery({
    queryKey: wishlistQueryKeys.all,
    queryFn: fetchWishlist,
    enabled,
    staleTime: 30 * 1000,
    // Wishlist drives add-to-cart size resolution; always revalidate on mount
    // so a refreshed API shape (e.g. nested variants) is picked up quickly.
    refetchOnMount: "always",
  });
}
