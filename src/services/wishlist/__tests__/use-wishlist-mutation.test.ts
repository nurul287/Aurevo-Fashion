import { http, HttpResponse } from "msw";
import { waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHookWithQueryClient } from "@/test/test-utils";
import { server } from "@/test/msw/server";
import { useToast } from "@/hooks/use-toast";
import {
  useAddToWishlist,
  useRemoveWishlistProduct,
} from "../use-wishlist-mutation";
import { wishlistQueryKeys, type WishlistData } from "../use-wishlist-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn(),
}));

const mockUseToast = vi.mocked(useToast);

describe("wishlist mutations", () => {
  const showError = vi.fn();

  beforeEach(() => {
    showError.mockClear();
    mockUseToast.mockReturnValue({
      showError,
      showSuccess: vi.fn(),
    } as unknown as ReturnType<typeof useToast>);
  });

  it("useAddToWishlist posts the product id and invalidates the list", async () => {
    let postedBody: unknown;
    server.use(
      http.post(`${API_URL}/wishlist/items`, async ({ request }) => {
        postedBody = await request.json();
        return HttpResponse.json({
          success: true,
          data: { id: "w1", product_id: "p1" },
        });
      }),
      http.get(`${API_URL}/wishlist`, () =>
        HttpResponse.json({
          success: true,
          data: { items: [{ id: "w1", product_id: "p1" }], item_count: 1 },
        }),
      ),
    );

    const { result, queryClient } = renderHookWithQueryClient(() =>
      useAddToWishlist(),
    );
    result.current.mutate("p1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(postedBody).toEqual({ productId: "p1" });

    await waitFor(() => {
      const cached = queryClient.getQueryData<WishlistData>(
        wishlistQueryKeys.all,
      );
      expect(cached?.itemCount).toBe(1);
    });
  });

  it("useRemoveWishlistProduct deletes by product id and updates the cache", async () => {
    server.use(
      http.delete(`${API_URL}/wishlist/products/p1`, () =>
        HttpResponse.json({
          success: true,
          message: "Item removed from wishlist",
        }),
      ),
    );

    const { result, queryClient } = renderHookWithQueryClient(() =>
      useRemoveWishlistProduct(),
    );
    queryClient.setQueryData<WishlistData>(wishlistQueryKeys.all, {
      items: [
        { id: "w1", user_id: "u1", product_id: "p1" },
        { id: "w2", user_id: "u1", product_id: "p2" },
      ],
      itemCount: 2,
    });

    result.current.mutate("p1");
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cached = queryClient.getQueryData<WishlistData>(
      wishlistQueryKeys.all,
    );
    expect(cached?.itemCount).toBe(1);
    expect(cached?.items.map((i) => i.product_id)).toEqual(["p2"]);
  });

  it("useAddToWishlist shows an error toast on failure", async () => {
    server.use(
      http.post(`${API_URL}/wishlist/items`, () =>
        HttpResponse.json(
          { success: false, error: { message: "Product is not available" } },
          { status: 422 },
        ),
      ),
    );

    const { result } = renderHookWithQueryClient(() => useAddToWishlist());
    result.current.mutate("p1");

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(showError).toHaveBeenCalledWith(
      "Could not save",
      "Product is not available",
    );
  });
});
