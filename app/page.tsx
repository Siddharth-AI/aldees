import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import ParallaxSection from "@/components/parallax-section"
import ImageRevealSection from "@/components/image-reveal-section"
import MenuHighlights from "@/components/menu-highlights"
import HorizontalScrollSection from "@/components/horizontal-scroll-section"
import ServicesSection from "@/components/services-section"
import VideoSection from "@/components/video-section"
import TextMarqueeSection from "@/components/text-marquee-section"
import CTASection from "@/components/cta-section"
import Experience from "@/components/experience"
import Testimonials from "@/components/testimonials"
import LocationHours from "@/components/location-hours"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"
import CustomCursor from "@/components/custom-cursor"
import Preloader from "@/components/preloader"
import FloatingElements from "@/components/floating-elements"
import ScrollProgress from "@/components/scroll-progress"
import MarqueeText from "@/components/marquee-text"

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <FloatingElements />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="overflow-hidden relative z-10">
        <Hero />
        <div className="py-6 bg-aldees-yellow">
          <MarqueeText
            text="FRESH PICKS • FLAVOR HITS • PREMIUM QUALITY • RESTAURANT & CAFE • BEST TASTE • HYGIENIC KITCHEN"
            className="text-2xl md:text-3xl font-bold text-aldees-black tracking-wider"
            speed={40}
          />
        </div>
        <About />
        <ParallaxSection />
        <ImageRevealSection />
        <VideoSection />
        <MenuHighlights />
        <div className="py-4 bg-aldees-black border-y border-aldees-yellow/20">
          <MarqueeText
            text="ORDER NOW • CALL US • DINE IN • TAKE AWAY • DELIVERY AVAILABLE"
            className="text-lg text-aldees-yellow/50 tracking-[0.3em] uppercase"
            speed={25}
            direction="right"
          />
        </div>
        <HorizontalScrollSection />
        <ServicesSection />
        <TextMarqueeSection />
        <Experience />
        <Testimonials />
        <CTASection />
        <LocationHours />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
