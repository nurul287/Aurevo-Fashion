import { describe, expect, it } from "vitest";
import {
  compareSizeLabels,
  getFirstVariantForCart,
  getUniqueSizesFromVariants,
  parseSizeSortKey,
  sortProductVariants,
  sortUniqueSizeLabels,
} from "../variant-size-sort";

describe("parseSizeSortKey", () => {
  it("extracts a numeric value from a size label", () => {
    expect(parseSizeSortKey("42")).toBe(42);
    expect(parseSizeSortKey("US 9.5")).toBe(9.5);
  });

  it("returns null for non-numeric or empty labels", () => {
    expect(parseSizeSortKey("XL")).toBeNull();
    expect(parseSizeSortKey("")).toBeNull();
    expect(parseSizeSortKey(null)).toBeNull();
    expect(parseSizeSortKey(undefined)).toBeNull();
  });
});

describe("compareSizeLabels", () => {
  it("sorts numeric sizes numerically, not lexically", () => {
    const sizes = ["40", "9", "41"];
    expect([...sizes].sort(compareSizeLabels)).toEqual(["9", "40", "41"]);
  });

  it("puts a recognized letter size before an unrelated numeric label", () => {
    // Not a real product scenario (a product is either all-shoe-sizes or
    // all-clothing-sizes, never mixed) -- this just pins deterministic
    // behavior for the fallback case. Letter-size recognition must win here,
    // since that's what lets "2XL" rank correctly among other letter sizes
    // instead of being misread as numeric size 2.
    expect(compareSizeLabels("40", "XL")).toBeGreaterThan(0);
    expect(compareSizeLabels("XL", "40")).toBeLessThan(0);
  });

  it("sorts standard clothing letter sizes small to large, not alphabetically", () => {
    const sizes = ["2XL", "L", "M", "S", "XL"];
    expect([...sizes].sort(compareSizeLabels)).toEqual(["S", "M", "L", "XL", "2XL"]);
  });

  it("does not misread '2XL' as numeric size 2 and sort it before every letter size", () => {
    expect(compareSizeLabels("2XL", "S")).toBeGreaterThan(0);
    expect(compareSizeLabels("S", "2XL")).toBeLessThan(0);
  });

  it("treats '2XL' and 'XXL' as the same rank", () => {
    expect(compareSizeLabels("2XL", "XXL")).toBe(0);
    expect(compareSizeLabels("3XL", "XXXL")).toBe(0);
  });
});

describe("sortUniqueSizeLabels", () => {
  it("de-duplicates and sorts", () => {
    expect(sortUniqueSizeLabels(["41", "40", "41", "42"])).toEqual(["40", "41", "42"]);
  });
});

describe("sortProductVariants", () => {
  it("sorts variants by size, ascending numerically", () => {
    const variants = [{ size: "42" }, { size: "40" }, { size: "41" }];
    expect(sortProductVariants(variants).map((v) => v.size)).toEqual(["40", "41", "42"]);
  });

  it("does not mutate the input array", () => {
    const variants = [{ size: "42" }, { size: "40" }];
    const result = sortProductVariants(variants);
    expect(result).not.toBe(variants);
  });
});

describe("getUniqueSizesFromVariants", () => {
  it("returns unique, sorted size labels", () => {
    const variants = [{ size: "41" }, { size: "40" }, { size: "41" }];
    expect(getUniqueSizesFromVariants(variants)).toEqual(["40", "41"]);
  });

  it("skips variants without a size", () => {
    const variants = [{ size: "40" }, {}, { size: undefined }];
    expect(getUniqueSizesFromVariants(variants)).toEqual(["40"]);
  });

  it("returns an empty array for null/undefined input", () => {
    expect(getUniqueSizesFromVariants(null)).toEqual([]);
    expect(getUniqueSizesFromVariants(undefined)).toEqual([]);
  });
});

describe("getFirstVariantForCart", () => {
  it("returns the active variant with the smallest size", () => {
    const variants = [
      { id: "v42", size: "42", is_active: true },
      { id: "v40", size: "40", is_active: true },
    ];
    expect(getFirstVariantForCart(variants)?.id).toBe("v40");
  });

  it("skips inactive variants", () => {
    const variants = [
      { id: "v40", size: "40", is_active: false },
      { id: "v41", size: "41", is_active: true },
    ];
    expect(getFirstVariantForCart(variants)?.id).toBe("v41");
  });

  it("returns undefined when there are no active variants", () => {
    const variants = [{ id: "v40", size: "40", is_active: false }];
    expect(getFirstVariantForCart(variants)).toBeUndefined();
  });

  it("returns undefined for an empty or missing variant list", () => {
    expect(getFirstVariantForCart([])).toBeUndefined();
    expect(getFirstVariantForCart(undefined)).toBeUndefined();
  });
});
