import Footer from "@/component/Footer/Footer";
import Navber from "@/component/Navber/Navber";
import Projects from "@/component/Projects/Projects";
import React from "react";

const page = () => {
  return (
    <div>
      <Navber />
      <Projects />
      <Footer />
    </div>
  );
};

export default page;
