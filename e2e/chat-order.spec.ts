import {
  expect,
  test,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { API_URL, seedProductAndVariant } from "./fixtures";

const CHAT_SESSION_KEY = "aurevo_chat_session_id";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const GUEST_SHIPPING = {
  name: "Chat E2E Guest",
  phone: "01711112222",
  address: "House 9, Road 3",
  district: "Chattogram",
  upazila: "Sitakunda",
};

type PublicOrderDraft = {
  draftId: string;
  items: Array<{
    variantId: string;
    quantity: number;
    productName: string;
    variantName: string | null;
    unitPrice: string;
    lineTotal: string;
  }>;
  shippingAddress: typeof GUEST_SHIPPING;
  email: string | null;
  subtotal: string;
  shippingAmount: string;
  totalAmount: string;
  paymentMethod: "cash";
};

/** Pin the chat session id before the widget mounts, so prepare/confirm share it. */
async function pinChatSession(page: Page, sessionId: string) {
  await page.addInitScript(
    ({ key, id }) => {
      localStorage.setItem(key, id);
    },
    { key: CHAT_SESSION_KEY, id: sessionId },
  );
}

async function prepareChatDraft(
  request: APIRequestContext,
  sessionId: string,
  variantId: string,
): Promise<PublicOrderDraft> {
  const res = await request.post(`${API_URL}/chat/orders/prepare`, {
    data: {
      sessionId,
      items: [{ variantId, quantity: 1 }],
      shippingAddress: GUEST_SHIPPING,
      email: "chat-e2e@example.com",
    },
  });
  const body = await res.json();
  if (!res.ok() || !body.success) {
    throw new Error(`prepare draft failed: ${JSON.stringify(body)}`);
  }
  return body.data as PublicOrderDraft;
}

/**
 * Mock POST /api/chat so we don't call Anthropic. The draft must already exist
 * on the BE (via /chat/orders/prepare) — Confirm hits the real create-order path.
 */
async function mockChatStreamWithDraft(page: Page, draft: PublicOrderDraft) {
  await page.route("**/api/chat**", async (route) => {
    const url = new URL(route.request().url());
    // Only the SSE chat endpoint — not /chat/orders/confirm or /cancel.
    if (route.request().method() !== "POST" || url.pathname !== "/api/chat") {
      await route.continue();
      return;
    }

    const conversationId = crypto.randomUUID();
    const frames = [
      `data: ${JSON.stringify({ conversationId })}\n\n`,
      `data: ${JSON.stringify({
        text: "I've prepared your Cash on Delivery order — please tap Confirm on the card below.",
      })}\n\n`,
      `data: ${JSON.stringify({ orderConfirmation: draft })}\n\n`,
      "data: [DONE]\n\n",
    ].join("");

    await route.fulfill({
      status: 200,
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
      body: frames,
    });
  });
}

async function openChatAndSend(page: Page, message: string) {
  // TanStack Query Devtools floats over the bottom-right launcher in local dev.
  await page.addStyleTag({
    content: ".tsqd-parent-container { display: none !important; }",
  });
  await page.getByRole("button", { name: /chat with aurevo/i }).click();
  await expect(
    page.getByRole("dialog", { name: /aurevo ai assistant/i }),
  ).toBeVisible();

  const input = page.getByPlaceholder("Ask a question…");
  await input.fill(message);
  // Submit control is icon-only (no accessible name) — Enter submits the form.
  await input.press("Enter");
}

test.describe("Chat bot COD order", () => {
  test("guest prepares a draft in chat, confirms, and lands on order confirmation", async ({
    page,
    request,
  }) => {
    const { product, variant } = await seedProductAndVariant(request);
    const sessionId = crypto.randomUUID();

    await pinChatSession(page, sessionId);
    const draft = await prepareChatDraft(request, sessionId, variant.id);
    expect(draft.shippingAmount).toBe("130.00"); // Chattogram → outside Dhaka

    await mockChatStreamWithDraft(page, draft);
    await page.goto("/");

    await openChatAndSend(page, `I'd like to buy ${product.name}`);

    const chat = page.getByRole("dialog", { name: /aurevo ai assistant/i });
    await expect(chat.getByText("Confirm Cash on Delivery order")).toBeVisible({
      timeout: 10_000,
    });
    await expect(
      chat.getByText(
        new RegExp(`1×\\s+${escapeRegExp(draft.items[0]!.productName)}`),
      ),
    ).toBeVisible();
    await expect(chat.getByText(`Total ৳${draft.totalAmount}`)).toBeVisible();
    await expect(chat.getByText(/Ship to Chat E2E Guest/)).toBeVisible();

    await chat.getByRole("button", { name: "Confirm", exact: true }).click();

    await expect(chat.getByText(/Your Cash on Delivery order/i)).toBeVisible({
      timeout: 15_000,
    });
    await expect(chat.getByText(/ORD-\d{12}/)).toBeVisible();

    await chat.getByRole("link", { name: /view order details/i }).click();
    await expect(page).toHaveURL(/\/order-confirmation/, { timeout: 10_000 });
    await expect(
      page.getByRole("heading", { name: /order confirmed/i }),
    ).toBeVisible({
      timeout: 10_000,
    });
  });

  test("cancel dismisses the confirmation card without placing an order", async ({
    page,
    request,
  }) => {
    const { variant } = await seedProductAndVariant(request);
    const sessionId = crypto.randomUUID();

    await pinChatSession(page, sessionId);
    const draft = await prepareChatDraft(request, sessionId, variant.id);
    await mockChatStreamWithDraft(page, draft);
    await page.goto("/");

    await openChatAndSend(page, "Ready to checkout");

    await expect(page.getByText("Confirm Cash on Delivery order")).toBeVisible({
      timeout: 10_000,
    });
    await page.getByRole("button", { name: "Cancel", exact: true }).click();

    await expect(page.getByText(/Order cancelled/i)).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText("Confirm Cash on Delivery order")).toHaveCount(
      0,
    );
  });
});
