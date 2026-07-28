/**
 * Sort shoe/clothing sizes numerically when possible (40, 41, 42… not 40, 42, 41).
 */

export function parseSizeSortKey(size: string | null | undefined): number | null {
  if (size == null) return null;
  const trimmed = String(size).trim();
  if (!trimmed) return null;
  const match = trimmed.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const n = Number.parseFloat(match[1]);
  return Number.isFinite(n) ? n : null;
}

// Standard letter-based clothing sizes, small to large. "2XL"/"3XL"/"4XL"
// alias the "XXL"/"XXXL"/"XXXXL" spellings to the same rank -- checked
// *before* parseSizeSortKey's digit extraction, since "2XL" is the one
// clothing size that contains a digit and would otherwise be misread as a
// small numeric (shoe) size and sorted ahead of every other letter size.
const LETTER_SIZE_RANK: Record<string, number> = {
  XXS: 0,
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  XXL: 6,
  "2XL": 6,
  XXXL: 7,
  "3XL": 7,
  XXXXL: 8,
  "4XL": 8,
  XXXXXL: 9,
  "5XL": 9,
};

function letterSizeRank(size: string | null | undefined): number | null {
  if (size == null) return null;
  const key = size.trim().toUpperCase();
  return key in LETTER_SIZE_RANK ? LETTER_SIZE_RANK[key]! : null;
}

export function compareSizeLabels(
  a: string | null | undefined,
  b: string | null | undefined,
): number {
  const la = letterSizeRank(a);
  const lb = letterSizeRank(b);
  if (la != null && lb != null) return la - lb;
  if (la != null) return -1;
  if (lb != null) return 1;

  const na = parseSizeSortKey(a);
  const nb = parseSizeSortKey(b);
  if (na != null && nb != null) {
    if (na !== nb) return na - nb;
  } else if (na != null) return -1;
  else if (nb != null) return 1;

  const sa = (a ?? "").trim();
  const sb = (b ?? "").trim();
  return sa.localeCompare(sb, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export function sortUniqueSizeLabels(sizes: Iterable<string>): string[] {
  return [...new Set(sizes)].sort(compareSizeLabels);
}

export type VariantWithSize = {
  size?: string | null;
  sort_order?: number | null;
};

export function sortProductVariants<T extends VariantWithSize>(variants: T[]): T[] {
  return [...variants].sort((a, b) => {
    const bySize = compareSizeLabels(a.size, b.size);
    if (bySize !== 0) return bySize;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
}

/** Preserve first-seen order from sorted variants (numeric size order). */
export type VariantForCart = VariantWithSize & {
  id: string;
  is_active?: boolean | null;
};

/** First active variant in numeric size order (matches PDP default size). */
export function getFirstVariantForCart(
  variants: VariantForCart[] | null | undefined,
): VariantForCart | undefined {
  const active = sortProductVariants(variants ?? []).filter(
    (v) => v.is_active !== false,
  );
  if (active.length === 0) return undefined;

  const firstSize = getUniqueSizesFromVariants(active)[0];
  if (firstSize) {
    return (
      active.find((v) => v.size?.trim() === firstSize) ?? active[0]
    );
  }
  return active[0];
}

export function getUniqueSizesFromVariants(
  variants: VariantWithSize[] | null | undefined,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const v of sortProductVariants(variants ?? [])) {
    const s = v.size?.trim();
    if (s && !seen.has(s)) {
      seen.add(s);
      out.push(s);
    }
  }
  return out;
}

export type AdminVariantRow = VariantWithSize & {
  product?: { name?: string | null } | null;
};

export function sortAdminVariantRows<T extends AdminVariantRow>(rows: T[]): T[] {
  return [...rows].sort((a, b) => {
    const byProduct = (a.product?.name ?? "").localeCompare(
      b.product?.name ?? "",
      undefined,
      { sensitivity: "base" },
    );
    if (byProduct !== 0) return byProduct;
    return compareSizeLabels(a.size, b.size);
  });
}

export function withSortedVariants<T extends { variants?: VariantWithSize[] | null }>(
  product: T,
): T {
  if (!product.variants?.length) return product;
  return { ...product, variants: sortProductVariants(product.variants) };
}

export function withSortedVariantsOnProducts<
  T extends { variants?: VariantWithSize[] | null },
>(products: T[]): T[] {
  return products.map(withSortedVariants);
}
