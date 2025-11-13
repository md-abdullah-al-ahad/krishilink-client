import { useEffect } from "react";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import LatestCrops from "../components/home/LatestCrops";
import Testimonials from "../components/home/Testimonials";
import AgroNews from "../components/home/AgroNews";

const Home = () => {
  useEffect(() => {
    document.title = "KrishiLink - Agricultural Marketplace";
  }, []);

  return (
    <div className="scroll-smooth">
      <Hero />

      <section className="bg-base-100">
        <Features />
      </section>

      <section className="bg-base-200">
        <HowItWorks />
      </section>

      <section className="bg-base-100">
        <LatestCrops />
      </section>

      <section className="bg-base-200">
        <Testimonials />
      </section>

      <section className="bg-base-100">
        <AgroNews />
      </section>
    </div>
  );
};

export default Home;
