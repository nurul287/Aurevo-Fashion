import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { AppSidebar } from "../app-sidebar";

vi.mock("@/contexts/auth-context", () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = vi.mocked(useAuth);

function renderSidebar(initialEntry = "/admin") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </MemoryRouter>
  );
}

describe("AppSidebar", () => {
  it("shows a fallback name/initial when there is no profile yet", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "admin@example.com" },
      profile: null,
      signOut: vi.fn(),
    } as unknown as ReturnType<typeof useAuth>);

    renderSidebar();
    expect(screen.getAllByText("Admin User").length).toBeGreaterThan(0);
    expect(screen.getAllByText("admin@example.com").length).toBeGreaterThan(0);
  });

  it("shows the user's full name from their profile", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "jane@example.com" },
      profile: { first_name: "Jane", last_name: "Doe" },
      signOut: vi.fn(),
    } as unknown as ReturnType<typeof useAuth>);

    renderSidebar();
    expect(screen.getAllByText("Jane Doe").length).toBeGreaterThan(0);
  });

  it("renders navigation links for every top-level section", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "admin@example.com" },
      profile: null,
      signOut: vi.fn(),
    } as unknown as ReturnType<typeof useAuth>);

    renderSidebar();
    expect(screen.getByRole("link", { name: /Dashboard/ })).toHaveAttribute(
      "href",
      "/admin"
    );
    expect(screen.getByText("Orders")).toBeInTheDocument();
  });

  it("opens space switcher with storefront and account links", async () => {
    mockUseAuth.mockReturnValue({
      user: { email: "admin@example.com" },
      profile: null,
      signOut: vi.fn(),
    } as unknown as ReturnType<typeof useAuth>);

    const user = userEvent.setup();
    renderSidebar();
    await user.click(screen.getByRole("button", { name: /Aurevo Admin/i }));
    expect(screen.getByRole("menuitem", { name: /Storefront/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("menuitem", { name: /My Account/i })).toHaveAttribute(
      "href",
      "/dashboard"
    );
  });

  it("calls signOut when the sign-out menu item is clicked", async () => {
    const signOut = vi.fn();
    mockUseAuth.mockReturnValue({
      user: { email: "admin@example.com" },
      profile: null,
      signOut,
    } as unknown as ReturnType<typeof useAuth>);

    const user = userEvent.setup();
    renderSidebar();
    await user.click(screen.getByRole("button", { name: /Admin User/i }));
    await user.click(await screen.findByRole("menuitem", { name: /Sign out/i }));
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
