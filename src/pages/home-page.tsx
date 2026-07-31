import {
  HeroSection,
  ProductCategorySection,
  FullCollectionBanner,
  NewCollectionSection,
  PromotionalBanners,
  OurShopSection,
  SneakerGallerySection,
  NewsletterBanner,
} from "@/components/home";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Catalog (former Aurevo gallery) — placed where product categories sat */}
      <SneakerGallerySection />

      {/* Hex product-category catalog — kept in tree but unmounted for now */}
      {false && <ProductCategorySection />}

      {/* Full Collection Banner — kept but unmounted for now */}
      {false && <FullCollectionBanner />}

      {/* New Collection Section */}
      <NewCollectionSection />

      {/* Our Shop Section */}
      <OurShopSection />

      {/* Promotional Banners — after Our Shop */}
      <PromotionalBanners />

      {/* Newsletter Banner */}
      <NewsletterBanner />
    </div>
  );
};

export default HomePage;
