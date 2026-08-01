import { API_URL, getStoredToken } from "./api";

export type ChatProduct = {
  id: string;
  name: string;
  image: string | null;
  basePrice: string;
};

export type ChatOrderDraftItem = {
  variantId: string;
  quantity: number;
  productName: string;
  variantName: string | null;
  unitPrice: string;
  lineTotal: string;
};

export type ChatOrderDraft = {
  draftId: string;
  items: ChatOrderDraftItem[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    district: string;
    upazila: string;
  };
  email: string | null;
  subtotal: string;
  shippingAmount: string;
  totalAmount: string;
  paymentMethod: "cash";
};

export type ChatOrderConfirmResult = {
  orderId: string;
  orderNumber: string;
  guestToken: string | null;
  subtotal: string;
  shippingAmount: string;
  totalAmount: string;
  paymentMethod: "cash";
  confirmationPath: string;
  confirmationUrl: string;
  items: ChatOrderDraftItem[];
};

export type ChatStreamEvent =
  | { type: "conversation"; conversationId: string }
  | { type: "thinking" }
  | { type: "text"; text: string }
  | { type: "products"; products: ChatProduct[] }
  | { type: "order_confirmation"; draft: ChatOrderDraft }
  | { type: "error"; message: string };

/**
 * POST /api/chat is an SSE endpoint but needs a request body, so it can't use
 * EventSource (GET-only). This parses the same `data: {...}\n\n` framing by
 * hand over a fetch ReadableStream — the standard pattern for a POST-based
 * SSE endpoint.
 */
export async function* streamChatMessage(
  message: string,
  sessionId: string,
  signal?: AbortSignal,
): AsyncGenerator<ChatStreamEvent> {
  const token = getStoredToken();

  let res: Response;
  try {
    res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ message, sessionId }),
      signal,
    });
  } catch {
    // Network failure (server unreachable, DNS, offline) — surface as a
    // normal chat error instead of an uncaught rejection that silently
    // strands the UI in "sending" state with no feedback.
    yield { type: "error", message: "Couldn't reach the chat assistant. Please check your connection and try again." };
    return;
  }

  if (!res.ok || !res.body) {
    const body = await res.json().catch(() => null);
    yield { type: "error", message: body?.error?.message ?? "Failed to reach the chat assistant." };
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const raw of events) {
      const line = raw.trim();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") return;

      try {
        const parsed = JSON.parse(payload) as {
          conversationId?: string;
          status?: string;
          text?: string;
          products?: ChatProduct[];
          orderConfirmation?: ChatOrderDraft;
          error?: string;
        };
        if (parsed.conversationId) yield { type: "conversation", conversationId: parsed.conversationId };
        else if (parsed.status === "thinking") yield { type: "thinking" };
        else if (parsed.text) yield { type: "text", text: parsed.text };
        else if (parsed.products) yield { type: "products", products: parsed.products };
        else if (parsed.orderConfirmation) {
          yield { type: "order_confirmation", draft: parsed.orderConfirmation };
        }
        else if (parsed.error) yield { type: "error", message: parsed.error };
      } catch {
        // Ignore malformed frames rather than breaking the whole stream.
      }
    }
  }
}

export async function confirmChatOrder(
  draftId: string,
  sessionId: string,
): Promise<ChatOrderConfirmResult> {
  const token = getStoredToken();
  const res = await fetch(`${API_URL}/chat/orders/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ draftId, sessionId }),
  });
  const json = (await res.json().catch(() => null)) as {
    success?: boolean;
    data?: ChatOrderConfirmResult;
    error?: { message?: string };
  } | null;
  if (!res.ok || !json?.data) {
    throw new Error(json?.error?.message ?? "Failed to place the order. Please try again.");
  }
  return json.data;
}

export async function cancelChatOrder(
  draftId: string,
  sessionId: string,
): Promise<void> {
  const token = getStoredToken();
  try {
    await fetch(`${API_URL}/chat/orders/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ draftId, sessionId }),
    });
  } catch {
    // Best-effort — card is dismissed locally either way.
  }
}
