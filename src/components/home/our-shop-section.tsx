import { SectionHeading } from "@/components/home/section-heading";
import { ViewAllProductsCta } from "@/components/home/view-all-products-cta";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/services";
import { useTranslation } from "react-i18next";

export const OurShopSection = () => {
  const { t } = useTranslation();
  const { data: productsData, isLoading } = useProducts({
    page: 1,
    limit: 8,
  });

  const products = productsData?.data || [];

  return (
    <section className="bg-white pb-6 pt-4 sm:pb-8 sm:pt-5">
      <div className="container-custom">
        <SectionHeading>{t("home.ourShop")}</SectionHeading>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl">
                <Skeleton className="aspect-square w-full rounded-t-2xl" />
                <div className="space-y-2 rounded-b-2xl bg-[#FDF7F3] p-3 sm:p-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="mt-2 h-9 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No products available in our shop.
            </p>
            <ViewAllProductsCta className="mt-6" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="teaser"
                />
              ))}
            </div>
            <ViewAllProductsCta />
          </>
        )}
      </div>
    </section>
  );
};
