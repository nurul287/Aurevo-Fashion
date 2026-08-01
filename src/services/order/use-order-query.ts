import { api, apiFetchList } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Order, OrderItem, PaginatedResponse } from "../types";

export interface AdminOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  paymentStatus?: string;
}

export const orderQueryKeys = {
  orders: (params: AdminOrdersParams) => ["orders", "list", params] as const,
  order: (id: string) => ["orders", "detail", id] as const,
} as const;

export function useOrders(params: AdminOrdersParams = {}) {
  const { page = 1, limit = 20, search, status, paymentStatus } = params;
  const qs = new URLSearchParams();
  qs.set("page", String(page));
  qs.set("limit", String(limit));
  if (search) qs.set("search", search);
  if (status && status !== "all") qs.set("status", status);
  if (paymentStatus && paymentStatus !== "all")
    qs.set("paymentStatus", paymentStatus);

  return useQuery({
    queryKey: orderQueryKeys.orders(params),
    queryFn: async (): Promise<PaginatedResponse<Order>> => {
      const { data, pagination } = await apiFetchList<Order>(
        `/orders?${qs.toString()}`,
      );
      return {
        data,
        count: pagination.total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: pagination.totalPages,
      };
    },
    staleTime: 30 * 1000,
  });
}

type OrderUser = {
  id?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  name?: string;
} | null;

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: orderQueryKeys.order(orderId),
    queryFn: (): Promise<Order & { user?: OrderUser; items?: OrderItem[] }> =>
      api.get<Order & { user?: OrderUser; items?: OrderItem[] }>(
        `/orders/${orderId}`,
      ),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });
}

/**
 * Load an order for the public confirmation page.
 *
 * Prefer `/orders/by-number/:orderNumber` — that route treats the order number
 * as the access key when no auth is sent (same as guest checkout). Fetching
 * by id without a guestToken requires a logged-in owner/admin JWT; chat and
 * checkout confirmation links often open without a usable session, which
 * previously surfaced as "Order not found".
 */
export function useFetchOrderWithGuestToken(
  orderId: string,
  guestToken?: string,
  orderNumber?: string,
) {
  return useQuery({
    queryKey: ["orders", "confirm", orderId, orderNumber, guestToken],
    queryFn: (): Promise<Order & { user?: OrderUser; items?: unknown[] }> => {
      const qs = guestToken
        ? `?guestToken=${encodeURIComponent(guestToken)}`
        : "";
      const url = orderNumber
        ? `/orders/by-number/${encodeURIComponent(orderNumber)}${qs}`
        : `/orders/${orderId}${qs}`;
      return api.get<Order & { user?: OrderUser; items?: unknown[] }>(url, {
        // Never send a JWT here: optionalAuth + a non-owner session would
        // block the public-by-number confirmation path.
        skipAuth: true,
      });
    },
    enabled: !!(orderNumber || orderId),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

// NOTE: `api.get`/`apiFetch` converts every response key from camelCase to
// snake_case (see src/lib/api.ts), so these fields must be declared in
// snake_case to match the object actually returned at runtime.
export interface OrderStats {
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
  confirmed_orders: number;
  processing_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  refunded_orders: number;
}

export function useOrderStats() {
  return useQuery({
    queryKey: ["orders", "stats"],
    queryFn: () => api.get<OrderStats>("/orders/stats"),
    staleTime: 2 * 60 * 1000,
  });
}
