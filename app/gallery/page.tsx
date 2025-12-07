import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"
import CustomCursor from "@/components/custom-cursor"
import GallerySection from "@/components/gallery-section"

export default function GalleryPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="overflow-hidden pt-24">
        <GallerySection />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
