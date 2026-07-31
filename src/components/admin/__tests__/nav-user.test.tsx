import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { NavUser } from "../nav-user";

vi.mock("@/contexts/auth-context", () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = vi.mocked(useAuth);

function renderNavUser() {
  return render(
    <MemoryRouter>
      <SidebarProvider>
        <NavUser />
      </SidebarProvider>
    </MemoryRouter>
  );
}

describe("NavUser", () => {
  it("renders the user's name and email from the auth profile", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "jane@example.com" },
      profile: { first_name: "Jane", last_name: "Doe" },
      signOut: vi.fn(),
    } as unknown as ReturnType<typeof useAuth>);

    renderNavUser();
    expect(screen.getAllByText("Jane Doe")[0]).toBeInTheDocument();
    expect(screen.getAllByText("jane@example.com")[0]).toBeInTheDocument();
  });

  it("opens the account menu with storefront and account shortcuts", async () => {
    mockUseAuth.mockReturnValue({
      user: { email: "jane@example.com" },
      profile: { first_name: "Jane", last_name: "Doe" },
      signOut: vi.fn(),
    } as unknown as ReturnType<typeof useAuth>);

    const user = userEvent.setup();
    renderNavUser();

    await user.click(screen.getByRole("button", { name: /Jane Doe/i }));
    expect(screen.getByRole("menuitem", { name: /View storefront/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("menuitem", { name: /My account/i })).toHaveAttribute(
      "href",
      "/dashboard"
    );
    expect(screen.getByRole("menuitem", { name: /Sign out/i })).toBeInTheDocument();
  });

  it("calls signOut when Sign out is clicked", async () => {
    const signOut = vi.fn();
    mockUseAuth.mockReturnValue({
      user: { email: "jane@example.com" },
      profile: { first_name: "Jane", last_name: "Doe" },
      signOut,
    } as unknown as ReturnType<typeof useAuth>);

    const user = userEvent.setup();
    renderNavUser();

    await user.click(screen.getByRole("button", { name: /Jane Doe/i }));
    await user.click(screen.getByRole("menuitem", { name: /Sign out/i }));
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
