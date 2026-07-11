import React, { useRef, useEffect } from "react";

import HeroSection from "./components/HeroSection";
import ProductSection from "./components/ProductSection";
import { useLocation } from "react-router-dom";

const Home = () => {

  const productSectionRef = useRef(null);
  const location = useLocation();

  // 2. Define a clean execution function
  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (location.state?.scrollToProducts) {
      scrollToProducts();
    }
  }, []);

  return (
    <>
      <HeroSection onShopClick={scrollToProducts} />
      <div id="products" ref={productSectionRef}>
        <ProductSection />
      </div>
    </>
  );
};

export default Home;