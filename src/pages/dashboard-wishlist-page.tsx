import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { APP_PATHS } from "@/constants/app-paths";
import { useWishlistActions } from "@/hooks/use-wishlist";
import { Heart, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const DashboardWishlistPage = () => {
  const { t } = useTranslation();
  const { items, itemCount, isLoading } = useWishlistActions();

  return (
    <div className="min-h-screen bg-muted/20 pb-16 pt-8 sm:pt-10">
      <div className="container-custom">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={APP_PATHS.dashboard}>{t("nav.dashboard")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("wishlist.title")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("wishlist.title")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("wishlist.subtitle")}
            </p>
          </div>
          {!isLoading && itemCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {t("wishlist.count", { count: itemCount })}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-white py-16 text-center">
            <Heart className="mb-3 h-10 w-10 text-gray-300" />
            <p className="text-base font-medium text-gray-900">{t("wishlist.empty")}</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {t("wishlist.emptyHint")}
            </p>
            <Button asChild className="mt-6">
              <Link to={APP_PATHS.products}>{t("wishlist.browseProducts")}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => {
              if (!item.product) return null;
              return (
                <ProductCard
                  key={item.id}
                  product={{
                    ...item.product,
                    id: item.product.id,
                    images: item.product.images,
                    variants: item.product.variants ?? [],
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardWishlistPage;
