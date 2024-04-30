import Footer from "@/component/Footer/Footer";
import Navber from "@/component/Navber/Navber";
import Tasks from "@/component/Tasks/Tasks";
import React from "react";

const page = () => {
  return (
    <div>
      <Navber />
      <Tasks />
      <Footer />
    </div>
  );
};

export default page;
