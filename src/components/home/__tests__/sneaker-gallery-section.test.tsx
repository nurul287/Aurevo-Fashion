import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { useCategories } from "@/services";
import { SneakerGallerySection } from "../sneaker-gallery-section";

vi.mock("@/services", () => ({
  useCategories: vi.fn(),
}));

const mockUseCategories = vi.mocked(useCategories);

function renderGallery() {
  return render(
    <MemoryRouter>
      <SneakerGallerySection />
    </MemoryRouter>,
  );
}

describe("SneakerGallerySection", () => {
  it("renders the gallery heading", () => {
    mockUseCategories.mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as ReturnType<typeof useCategories>);

    renderGallery();
    expect(
      screen.getByRole("heading", { name: "Aurevo gallery" }),
    ).toBeInTheDocument();
  });

  it("uses the local category photos from /public", () => {
    mockUseCategories.mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as ReturnType<typeof useCategories>);

    const { container } = renderGallery();
    expect(screen.getAllByRole("link")).toHaveLength(8);
    expect(container.querySelector('img[src="/cap.webp"]')).toBeTruthy();
    expect(container.querySelector('img[src="/watch.webp"]')).toBeTruthy();
    expect(container.querySelector('img[src="/t-shirt.webp"]')).toBeTruthy();
    expect(container.querySelector('img[src="/sunglass.webp"]')).toBeTruthy();
    expect(screen.getByRole("link", { name: "T Shirt" })).toHaveAttribute(
      "href",
      "/products?category=t-shirt",
    );
  });

  it("maps T-SHART / t-shirt categories to T Shirt with the polo photo", () => {
    mockUseCategories.mockReturnValue({
      data: [
        { id: "c1", name: "T-SHART", slug: "t-shirt", image_url: null },
        { id: "c2", name: "Cap", slug: "cap", image_url: null },
      ],
      isLoading: false,
    } as unknown as ReturnType<typeof useCategories>);

    const { container } = renderGallery();
    expect(screen.getByRole("link", { name: "T Shirt" })).toHaveAttribute(
      "href",
      "/products?category=t-shirt",
    );
    expect(container.querySelector('img[src="/t-shirt.webp"]')).toBeTruthy();
    expect(container.querySelector('img[src="/cap.webp"]')).toBeTruthy();
  });

  it("normalizes mixed-case CMS names to Title Case", () => {
    mockUseCategories.mockReturnValue({
      data: [
        { id: "c1", name: "SNEAKERS", slug: "sneakers", image_url: null },
        { id: "c2", name: "PANJABI", slug: "panjabi", image_url: null },
      ],
      isLoading: false,
    } as unknown as ReturnType<typeof useCategories>);

    renderGallery();
    expect(screen.getByRole("link", { name: "Sneakers" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Panjabi" })).toBeInTheDocument();
  });
});
