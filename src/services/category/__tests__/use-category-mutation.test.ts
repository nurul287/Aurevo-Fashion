import { http, HttpResponse } from "msw";
import { waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHookWithQueryClient } from "@/test/test-utils";
import { server } from "@/test/msw/server";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn(),
}));

const mockUseToast = vi.mocked(useToast);

import {
  useBulkUpdateCategoryStatus,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../use-category-mutation";

describe("category mutations", () => {
  const showSuccess = vi.fn();
  const showError = vi.fn();

  beforeEach(() => {
    showSuccess.mockClear();
    showError.mockClear();
    mockUseToast.mockReturnValue({
      showSuccess,
      showError,
    } as unknown as ReturnType<typeof useToast>);
  });

  it("useCreateCategory posts multipart form data and shows a success toast", async () => {
    let receivedFields: Record<string, string> = {};
    server.use(
      http.post(`${API_URL}/categories`, async ({ request }) => {
        const form = await request.formData();
        receivedFields = {
          name: String(form.get("name")),
          slug: String(form.get("slug")),
        };
        return HttpResponse.json({ success: true, data: { id: "c1" } });
      }),
    );

    const { result } = renderHookWithQueryClient(() => useCreateCategory());
    result.current.mutate({ name: "Shoes", slug: "shoes" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(receivedFields).toEqual({ name: "Shoes", slug: "shoes" });
    expect(showSuccess).toHaveBeenCalledWith(
      "Category Created",
      "Category has been successfully created",
    );
  });

  it("useCreateCategory shows an error toast on failure", async () => {
    server.use(
      http.post(`${API_URL}/categories`, () =>
        HttpResponse.json(
          { success: false, error: { message: "Slug taken" } },
          { status: 422 },
        ),
      ),
    );

    const { result } = renderHookWithQueryClient(() => useCreateCategory());
    result.current.mutate({ name: "Shoes", slug: "shoes" });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(showError).toHaveBeenCalledWith(
      "Failed to Create Category",
      "Slug taken",
    );
  });

  it("useUpdateCategory includes the selected image file in the multipart form data", async () => {
    // Regression test: the mutationFn destructures `imageFile` off of its
    // input to keep it out of the plain-field spread, but a prior version
    // forgot to add it back in before building the FormData -- so a category
    // image change silently never left the browser (no "image" field at all
    // in the request), even though the mutation still reported success.
    // Spies on fetch directly (rather than reading the request server-side
    // via MSW) since this test environment's undici-based multipart parser
    // doesn't recognize jsdom's File instances -- the FormData the browser
    // actually sends is what matters here, not how a Node server re-parses it.
    const file = new File(["fake-bytes"], "cover.png", { type: "image/png" });
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ success: true, data: { id: "c1" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

    const { result } = renderHookWithQueryClient(() => useUpdateCategory());
    result.current.mutate({ id: "c1", name: "Watch", imageFile: file });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [, init] = fetchSpy.mock.calls[0]!;
    const sentForm = init!.body as FormData;
    expect(sentForm.get("name")).toBe("Watch");
    const sentImage = sentForm.get("image");
    expect(sentImage).toBeInstanceOf(File);
    expect((sentImage as File).name).toBe("cover.png");

    expect(showSuccess).toHaveBeenCalledWith(
      "Category Updated",
      "Category has been successfully updated",
    );

    fetchSpy.mockRestore();
  });

  it("useDeleteCategory deletes and shows a success toast", async () => {
    server.use(
      http.delete(
        `${API_URL}/categories/c1`,
        () => new HttpResponse(null, { status: 204 }),
      ),
    );

    const { result } = renderHookWithQueryClient(() => useDeleteCategory());
    result.current.mutate("c1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(showSuccess).toHaveBeenCalledWith(
      "Category Deleted",
      "Category has been successfully deleted",
    );
  });

  it("useDeleteCategory shows an error toast when the category has children", async () => {
    server.use(
      http.delete(`${API_URL}/categories/c1`, () =>
        HttpResponse.json(
          {
            success: false,
            error: { message: "Category has child categories" },
          },
          { status: 422 },
        ),
      ),
    );

    const { result } = renderHookWithQueryClient(() => useDeleteCategory());
    result.current.mutate("c1");

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(showError).toHaveBeenCalledWith(
      "Failed to Delete Category",
      "Category has child categories",
    );
  });

  it("useBulkUpdateCategoryStatus updates every category and reports the count", async () => {
    server.use(
      http.patch(`${API_URL}/categories/:id`, () =>
        HttpResponse.json({ success: true, data: { id: "1" } }),
      ),
    );

    const { result } = renderHookWithQueryClient(() =>
      useBulkUpdateCategoryStatus(),
    );
    result.current.mutate({ categoryIds: ["c1", "c2"], isActive: false });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(showSuccess).toHaveBeenCalledWith(
      "Categories Updated",
      "2 categories have been deactivated",
    );
  });
});
