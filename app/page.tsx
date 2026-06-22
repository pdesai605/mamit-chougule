import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Stats from "./components/Stats";
import Work from "./components/Work";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Statement from "./components/Statement";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <Work />
        <Gallery />
        <About />
        <Statement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
