import Footer from "@/component/Footer/Footer";
import Navber from "@/component/Navber/Navber";
import ProjectUpdate from "@/component/ProjectUpdate/ProjectUpdate";
import React from "react";

const page = () => {
  return (
    <div>
      <Navber />
      <ProjectUpdate />
      <Footer />
    </div>
  );
};

export default page;
