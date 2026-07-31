import { http, HttpResponse } from "msw";
import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderHookWithQueryClient } from "@/test/test-utils";
import { server } from "@/test/msw/server";
import { fetchWishlist, useWishlist } from "../use-wishlist-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

describe("fetchWishlist", () => {
  it("maps item_count to itemCount and returns items", async () => {
    server.use(
      http.get(`${API_URL}/wishlist`, () =>
        HttpResponse.json({
          success: true,
          data: {
            items: [
              {
                id: "w1",
                product_id: "p1",
                product: {
                  id: "p1",
                  name: "Air Runner",
                  slug: "air-runner",
                  base_price: "1000",
                  variants: [{ id: "v1", size: "42" }],
                },
              },
            ],
            item_count: 1,
          },
        }),
      ),
    );

    const result = await fetchWishlist();
    expect(result.itemCount).toBe(1);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.product?.variants?.[0]?.size).toBe("42");
  });
});

describe("useWishlist", () => {
  it("is disabled when enabled=false", () => {
    const { result } = renderHookWithQueryClient(() => useWishlist(false));
    expect(result.current.fetchStatus).toBe("idle");
  });

  it("fetches the wishlist when enabled", async () => {
    server.use(
      http.get(`${API_URL}/wishlist`, () =>
        HttpResponse.json({
          success: true,
          data: { items: [], item_count: 0 },
        }),
      ),
    );

    const { result } = renderHookWithQueryClient(() => useWishlist(true));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ items: [], itemCount: 0 });
  });
});
