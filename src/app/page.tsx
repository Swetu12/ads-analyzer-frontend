import React from "react";
import ReactLenis from "lenis/react";
import Header from "@/components/landing/Header.tsx";
import Hero from "@/components/landing/Hero.tsx";
import Brand from "@/components/landing/Brand.tsx";
import Feature from "@/components/landing/Feature.tsx";
import Process from "@/components/landing/Process.tsx";
import Overview from "@/components/landing/Overview.tsx";
import PricingInHero from "@/components/landing/PricingInHero.tsx";
import { Testimonials } from "@/components/landing/Testimonials.tsx";
import Footer from "@/components/landing/Footer.tsx";

const Page = () => {
  return (
    <ReactLenis root={true}>
      <div className={"relative isolate overflow-hidden"}>
        <Header />
        <main>
          <Hero />
          <Brand />
          <Feature />
          <Process />
          <Overview />
          <div className={`pb-10`}>
            <PricingInHero />
          </div>
          <Testimonials />
          <Footer />
        </main>
      </div>
    </ReactLenis>
  );
};
export default Page;
