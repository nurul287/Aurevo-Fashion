import { Button } from "@/components/ui/button";
import { APP_PATHS } from "@/constants/app-paths";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type ViewAllProductsCtaProps = {
  variant?: "solid" | "outline";
  className?: string;
};

/** Shared home-page CTA that navigates to the full products catalog. */
export function ViewAllProductsCta({
  variant = "outline",
  className,
}: ViewAllProductsCtaProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("mt-8 flex justify-center sm:mt-10", className)}>
      <Button
        asChild
        variant={variant === "solid" ? "default" : "outline"}
        size="lg"
        className={cn(
          "group h-11 rounded-full px-7 text-sm font-medium tracking-wide uppercase",
          variant === "solid"
            ? "bg-[#111111] text-white hover:bg-[#2A2A2A]"
            : "border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white",
        )}
      >
        <Link to={APP_PATHS.products}>
          {t("home.viewAllProducts")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
}
