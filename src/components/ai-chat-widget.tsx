import AiChatbotIcon from "@/assets/icon/ai-chatbot-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_PATHS } from "@/constants/app-paths";
import type { ChatOrderDraft, ChatProduct } from "@/lib/chat-stream";
import {
  cancelChatOrder,
  confirmChatOrder,
  streamChatMessage,
} from "@/lib/chat-stream";
import { Loader2, Send, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useLocation } from "react-router-dom";

const SESSION_STORAGE_KEY = "aurevo_chat_session_id";
const CONVERSATION_STORAGE_KEY = "aurevo_chat_conversation_id";

const CHIP_CLASS =
  "cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-700 transition-colors hover:border-[#FF6600] hover:text-[#FF6600] disabled:cursor-not-allowed disabled:opacity-50";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  products?: ChatProduct[];
  orderDraft?: ChatOrderDraft;
  /** Cleared after confirm/cancel so the card does not reappear. */
  orderDraftDismissed?: boolean;
};

/** Contextual Yes/No / Skip chips for COD collection questions (matches BE prompt wording). */
export function quickRepliesForAssistant(content: string): string[] | null {
  const t = content.toLowerCase();
  if (/anything else|want anything else/.test(t)) return ["Yes", "No"];
  if (
    /email\s*\(optional\)|what'?s your email|your email\?|tap skip|prefer not to share/.test(
      t,
    )
  ) {
    return ["Skip"];
  }
  return null;
}

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
}

/** Renders assistant replies the way ChatGPT-style UIs do — real bold/lists — instead of raw markdown asterisks. */
function AssistantMarkdown({ content }: { content: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="m-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="ml-4 list-disc space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-4 list-decimal space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-0.5">{children}</li>,
          a: ({ children, href }) => {
            if (href?.startsWith("/")) {
              return (
                <Link
                  to={href}
                  className="text-[#FF6600] underline underline-offset-2"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6600] underline underline-offset-2"
              >
                {children}
              </a>
            );
          },
          code: ({ children }) => (
            <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-[13px]">
              {children}
            </code>
          ),
          h1: ({ children }) => <p className="font-semibold">{children}</p>,
          h2: ({ children }) => <p className="font-semibold">{children}</p>,
          h3: ({ children }) => <p className="font-semibold">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/** Clickable product cards under an assistant reply — the intuitive alternative to a plain text list. */
function ProductCards({
  products,
  onNavigate,
}: {
  products: ChatProduct[];
  onNavigate: () => void;
}) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-1.5">
      {products.map((product) => (
        <Link
          key={product.id}
          to={APP_PATHS.productDetail(product.id)}
          onClick={onNavigate}
          className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
        >
          <div className="flex aspect-square items-center justify-center overflow-hidden bg-gray-50">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <ShoppingBag className="h-5 w-5 text-gray-300" />
            )}
          </div>
          <div className="p-1.5">
            <p className="line-clamp-2 text-[11px] font-medium leading-tight text-gray-900">
              {product.name}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-[#FF6600]">
              ৳{product.basePrice}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function OrderConfirmCard({
  draft,
  busy,
  onConfirm,
  onCancel,
}: {
  draft: ChatOrderDraft;
  busy: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const addr = draft.shippingAddress;
  return (
    <div className="mt-2 space-y-2 rounded-xl border border-[#FF6600]/40 bg-white p-3 text-left shadow-sm">
      <p className="text-xs font-semibold text-gray-900">
        Confirm Cash on Delivery order
      </p>
      <ul className="space-y-1 text-[11px] text-gray-700">
        {draft.items.map((item) => (
          <li key={`${item.variantId}-${item.quantity}`}>
            {item.quantity}× {item.productName}
            {item.variantName ? ` (${item.variantName})` : ""} — ৳
            {item.lineTotal}
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-gray-600">
        Ship to {addr.name}, {addr.address}, {addr.upazila}, {addr.district}
        {addr.phone ? ` · ${addr.phone}` : ""}
      </p>
      <div className="flex items-baseline justify-between text-[11px]">
        <span className="text-gray-600">
          Subtotal ৳{draft.subtotal} + shipping ৳{draft.shippingAmount}
        </span>
        <span className="font-semibold text-[#FF6600]">
          Total ৳{draft.totalAmount}
        </span>
      </div>
      <p className="text-[11px] text-gray-500">
        Tap Confirm to place this Cash on Delivery order, or Cancel to change
        it.
      </p>
      <div className="flex gap-2 pt-0.5">
        <Button
          type="button"
          size="sm"
          disabled={busy}
          onClick={onConfirm}
          className="h-8 flex-1 cursor-pointer bg-[#FF6600] text-xs hover:bg-[#e65c00]"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Confirm"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={onCancel}
          className="h-8 flex-1 cursor-pointer text-xs"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

/**
 * Floating AI shopping assistant — a compact chatbot popup (not a full-height
 * side panel) anchored above its own launcher button. Answers product,
 * policy/FAQ, and (when logged in) order questions via the RAG-backed
 * POST /api/chat endpoint, streamed token-by-token over SSE.
 */
export function AiChatWidget() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [confirmingDraftId, setConfirmingDraftId] = useState<string | null>(
    null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  // Click-outside and Escape close the popup, same as any lightweight chat widget.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (isAdminRoute) return null;

  async function sendMessage(overrideText?: string) {
    const text = (overrideText ?? input).trim();
    if (!text || isStreaming) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsStreaming(true);
    setIsThinking(false);

    const sessionId = sessionIdRef.current ?? getOrCreateSessionId();
    let assistantText = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      for await (const event of streamChatMessage(text, sessionId)) {
        if (event.type === "conversation") {
          localStorage.setItem(CONVERSATION_STORAGE_KEY, event.conversationId);
        } else if (event.type === "thinking") {
          setIsThinking(true);
        } else if (event.type === "text") {
          setIsThinking(false);
          assistantText += event.text;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              ...next[next.length - 1]!,
              role: "assistant",
              content: assistantText,
            };
            return next;
          });
        } else if (event.type === "products") {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1]!;
            next[next.length - 1] = { ...last, products: event.products };
            return next;
          });
        } else if (event.type === "order_confirmation") {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1]!;
            next[next.length - 1] = {
              ...last,
              orderDraft: event.draft,
              orderDraftDismissed: false,
            };
            return next;
          });
        } else if (event.type === "error") {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: event.message,
            };
            return next;
          });
        }
      }
    } catch {
      // Belt-and-suspenders: streamChatMessage already converts network/HTTP
      // failures into `error` events, but anything else unexpected (e.g. the
      // reader failing mid-stream) still gets a visible message instead of
      // silently leaving the bubble empty.
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        };
        return next;
      });
    } finally {
      setIsThinking(false);
      setIsStreaming(false);
    }
  }

  async function handleConfirmOrder(
    messageIndex: number,
    draft: ChatOrderDraft,
  ) {
    if (confirmingDraftId) return;
    const sessionId = sessionIdRef.current ?? getOrCreateSessionId();
    setConfirmingDraftId(draft.draftId);
    try {
      const result = await confirmChatOrder(draft.draftId, sessionId);
      setMessages((prev) => {
        const next = [...prev];
        const msg = next[messageIndex];
        if (msg) {
          next[messageIndex] = { ...msg, orderDraftDismissed: true };
        }
        next.push({
          role: "assistant",
          content:
            `Your Cash on Delivery order **${result.orderNumber}** is placed. Total **BDT ${Number(result.totalAmount).toLocaleString("en-BD")}** (including shipping).\n\n` +
            `[View order details](${result.confirmationPath})`,
        });
        return next;
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to place the order. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    } finally {
      setConfirmingDraftId(null);
    }
  }

  async function handleCancelOrder(
    messageIndex: number,
    draft: ChatOrderDraft,
  ) {
    if (confirmingDraftId) return;
    const sessionId = sessionIdRef.current ?? getOrCreateSessionId();
    setConfirmingDraftId(draft.draftId);
    try {
      await cancelChatOrder(draft.draftId, sessionId);
    } finally {
      setMessages((prev) => {
        const next = [...prev];
        const msg = next[messageIndex];
        if (msg) {
          next[messageIndex] = { ...msg, orderDraftDismissed: true };
        }
        next.push({
          role: "assistant",
          content:
            "Order cancelled. Tell me if you want to change the items, size, or shipping details.",
        });
        return next;
      });
      setConfirmingDraftId(null);
    }
  }

  return (
    <>
      <button
        aria-label={
          open
            ? "Close Aurevo AI assistant"
            : "Chat with Aurevo's AI shopping assistant"
        }
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-3 right-3 z-[9999] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full shadow-[0_3px_14px_rgba(255,102,0,0.45)] transition-transform hover:scale-[1.03] motion-reduce:transform-none sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        {open ? (
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#111111] text-white">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        ) : (
          <AiChatbotIcon className="h-full w-full" />
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Aurevo AI assistant"
          className="fixed bottom-[70px] right-3 z-[9998] flex h-[70vh] max-h-[600px] w-[calc(100vw-24px)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:bottom-24 sm:right-6"
        >
          <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
            <AiChatbotIcon className="h-7 w-7" />
            <span className="text-base font-semibold">Aurevo AI Assistant</span>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-xs text-gray-700">
                  Hey there! 👋 Looking for something specific today? I can help
                  you find your best products.
                </p>
                <div className="flex flex-col items-start gap-2">
                  {[
                    "Show me your best sneakers",
                    "What's your return policy?",
                    "What is the delivery time?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void sendMessage(suggestion)}
                      className={CHIP_CLASS}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              const replies =
                m.role === "assistant" && isLast && !isStreaming && m.content
                  ? quickRepliesForAssistant(m.content)
                  : null;

              return (
                <div key={i} className="space-y-2">
                  <div
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-3.5 py-2 ${
                        m.role === "user"
                          ? "whitespace-pre-wrap bg-[#111111] text-sm text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <>
                          {m.content ? (
                            <AssistantMarkdown content={m.content} />
                          ) : isStreaming && isLast && !isThinking ? (
                            <span className="text-sm">…</span>
                          ) : null}
                          {m.products && m.products.length > 0 && (
                            <ProductCards
                              products={m.products}
                              onNavigate={() => setOpen(false)}
                            />
                          )}
                          {m.orderDraft && !m.orderDraftDismissed && (
                            <OrderConfirmCard
                              draft={m.orderDraft}
                              busy={confirmingDraftId === m.orderDraft.draftId}
                              onConfirm={() =>
                                void handleConfirmOrder(i, m.orderDraft!)
                              }
                              onCancel={() =>
                                void handleCancelOrder(i, m.orderDraft!)
                              }
                            />
                          )}
                        </>
                      ) : (
                        m.content
                      )}
                    </div>
                  </div>
                  {replies && replies.length > 0 && (
                    <div className="flex flex-wrap items-start gap-2 pl-0.5">
                      {replies.map((reply) => (
                        <button
                          key={reply}
                          type="button"
                          disabled={isStreaming}
                          onClick={() => void sendMessage(reply)}
                          className={CHIP_CLASS}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isThinking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-3.5 py-2 text-sm text-gray-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Searching…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage();
            }}
            className="flex items-center gap-2 border-t border-gray-100 px-3 py-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              disabled={isStreaming}
              className="h-10 flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isStreaming || !input.trim()}
              className="h-10 w-10 shrink-0"
            >
              {isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
