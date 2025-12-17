import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"
import CustomCursor from "@/components/custom-cursor"
import MenuSection from "@/components/menu-section"

export default function MenuPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="overflow-hidden pt-24">
        <MenuSection />
      </main>
      <Footer />
    </SmoothScroll>
  )
}