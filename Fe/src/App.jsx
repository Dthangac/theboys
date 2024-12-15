import React from "react";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/footer/footer";
import DanhMuchot from "./components/main/catehot";
import Baohanh from "./components/main/baohanh";
import BannerPro from "./components/main/hotcate";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
      <Navbar />
      <Hero />
      <BannerPro />
      <DanhMuchot />
      <Baohanh />
      <Footer />
    </div>
  );
};

export default App;
