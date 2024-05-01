import Footer from "@/component/Footer/Footer";
import Navber from "@/component/Navber/Navber";
import TaskUpdate from "@/component/TaskUpdate/TaskUpdate";
import React from "react";

const page = () => {
  return (
    <div>
      <Navber />
      <TaskUpdate />
      <Footer />
    </div>
  );
};

export default page;
