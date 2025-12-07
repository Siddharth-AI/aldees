import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"
import CustomCursor from "@/components/custom-cursor"
import ContactSection from "@/components/contact-section"

export default function ContactPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="overflow-hidden pt-24">
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
