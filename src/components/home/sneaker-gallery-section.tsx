import { APP_PATHS } from "@/constants/app-paths";
import { useCategories } from "@/services";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const GALLERY_COUNT = 8;

const FALLBACK_LABELS = [
  { name: "Sneakers", slug: "sneakers" },
  { name: "Cap", slug: "cap" },
  { name: "Shirt", slug: "shirt" },
  { name: "T Shirt", slug: "t-shirt" },
  { name: "Panjabi", slug: "panjabi" },
  { name: "Pant", slug: "pant" },
  { name: "Watch", slug: "watch" },
  { name: "Sunglasses", slug: "sunglasses" },
] as const;

/** Local lifestyle photos under /public — keys are normalized slugs/names. */
const CATEGORY_GALLERY_IMAGES: Record<string, string> = {
  sneakers: "/galary-1.webp",
  sneaker: "/galary-1.webp",
  cap: "/cap.webp",
  shirt: "/shirt.webp",
  polo: "/t-shirt.webp",
  "t-shirt": "/t-shirt.webp",
  tshirt: "/t-shirt.webp",
  "t-shart": "/t-shirt.webp",
  tshart: "/t-shirt.webp",
  panjabi: "/panjabi.webp",
  pant: "/pant.webp",
  pants: "/pant.webp",
  watch: "/watch.webp",
  sunglasses: "/sunglass.webp",
  sunglass: "/sunglass.webp",
};

/** Prefer cleaner storefront labels when the CMS name is off (e.g. T-SHART). */
const DISPLAY_NAME_BY_KEY: Record<string, string> = {
  polo: "T Shirt",
  "t-shirt": "T Shirt",
  tshirt: "T Shirt",
  "t-shart": "T Shirt",
  tshart: "T Shirt",
};

type GalleryTileData = {
  key: string;
  src: string;
  name: string;
  slug: string;
};

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function toTitleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolveGalleryImage(
  slug: string,
  name: string,
  imageUrl: string | null | undefined,
  index: number,
): string {
  for (const raw of [slug, name]) {
    if (!raw) continue;
    const fromLocal = CATEGORY_GALLERY_IMAGES[normalizeKey(raw)];
    if (fromLocal) return fromLocal;
  }

  const fromApi = imageUrl?.trim();
  if (fromApi) return fromApi;

  return `/galary-${index + 1}.webp`;
}

function resolveDisplayName(
  slug: string,
  name: string,
  fallback: string,
): string {
  for (const raw of [slug, name]) {
    if (!raw) continue;
    const override = DISPLAY_NAME_BY_KEY[normalizeKey(raw)];
    if (override) return override;
  }
  return toTitleCase(name.trim() || fallback);
}

function GalleryTile({ item }: { item: GalleryTileData }) {
  return (
    <Link
      to={`${APP_PATHS.products}?category=${encodeURIComponent(item.slug)}`}
      className="group relative block aspect-[3/4] w-full overflow-hidden bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
    >
      <img
        src={item.src}
        alt=""
        loading="lazy"
        decoding="async"
        sizes="(max-width: 640px) 50vw, 25vw"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center px-2 pb-4 pt-10 sm:pb-5 md:pb-6">
        <span className="text-center text-sm font-medium tracking-wide text-white drop-shadow-sm sm:text-[15px] md:text-base">
          {item.name}
        </span>
      </div>
    </Link>
  );
}

function buildGalleryTiles(
  categories: Array<{
    id?: string;
    name?: string;
    slug?: string;
    image_url?: string | null;
  }>,
): GalleryTileData[] {
  const fromApi = categories
    .filter((cat) => cat.slug || cat.name)
    .slice(0, GALLERY_COUNT)
    .map((category, i) => {
      const fallback = FALLBACK_LABELS[i];
      const rawName = category.name?.trim() || fallback?.name || "Category";
      const slug = category.slug?.trim() || normalizeKey(rawName);
      return {
        key: category.id || `gallery-${slug}`,
        src: resolveGalleryImage(slug, rawName, category.image_url, i),
        name: resolveDisplayName(slug, rawName, fallback?.name || "Category"),
        slug,
      };
    });

  if (fromApi.length > 0) return fromApi;

  return FALLBACK_LABELS.map((fallback, i) => ({
    key: `gallery-${i + 1}`,
    src: resolveGalleryImage(fallback.slug, fallback.name, null, i),
    name: fallback.name,
    slug: fallback.slug,
  }));
}

export const SneakerGallerySection = () => {
  const { t } = useTranslation();
  const { data: categories = [] } = useCategories();
  const tiles = buildGalleryTiles(categories);

  return (
    <section
      className="bg-white py-10 sm:py-12"
      aria-labelledby="sneaker-gallery-heading"
    >
      <div className="container-custom">
        <div className="mb-8 flex items-center justify-center gap-3 sm:mb-10 sm:gap-5 md:gap-6">
          <span className="h-px w-8 bg-slate-300 sm:w-14 md:w-20" aria-hidden />
          <h2
            id="sneaker-gallery-heading"
            className="shrink-0 text-center text-2xl font-bold uppercase tracking-[0.12em] text-slate-900 sm:text-3xl md:text-4xl"
          >
            {t("home.gallery")}
          </h2>
          <span className="h-px w-8 bg-slate-300 sm:w-14 md:w-20" aria-hidden />
        </div>

        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 sm:gap-1.5 md:grid-cols-4 md:gap-2">
          {tiles.map((item) => (
            <li key={item.key} className="min-w-0">
              <GalleryTile item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
