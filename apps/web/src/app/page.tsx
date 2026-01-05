import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { BenefitsSection } from "@/components/home/benefits-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { ProcessSection } from "@/components/home/process-section"
import { GallerySection } from "@/components/home/gallery-section"
import { ReviewsSection } from "@/components/home/reviews-section"
import { FaqSection } from "@/components/home/faq-section"
import { MastersCtaSection } from "@/components/home/masters-cta-section"
import { WholesaleSection } from "@/components/home/wholesale-section"
import { MarketplaceSection } from "@/components/home/marketplace-section"
import { SeoTextSection } from "@/components/home/seo-text-section"
import { StickyCta } from "@/components/sticky-cta"
import { RecentlyViewed } from "@/components/recently-viewed"
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ProductChat } from "@/components/ai/product-chat"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LocalBusinessJsonLd />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <BenefitsSection />
        <CategoriesSection />
        <RecentlyViewed />
        <ProcessSection />
        <GallerySection />
        <WholesaleSection />
        <ReviewsSection />
        <FaqSection />
        <MastersCtaSection />
        <MarketplaceSection />
        <SeoTextSection />
      </main>
      <SiteFooter />
      <StickyCta />
      <ScrollToTop />
      {/* AI Product Chat */}
      <ProductChat />
    </div>
  )
}
