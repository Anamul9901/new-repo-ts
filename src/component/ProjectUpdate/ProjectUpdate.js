/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProjectUpdate = () => {
  const [allTasks, setAllTasks] = useState([]);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => setAllTasks(res.data))
      .catch((err) => console.log(err));
  }, []);
  const task = allTasks.filter((task) => task._id == id);
  const task2 = task[0];
  //   console.log(task2);

  const name = task2?.name;
  const dadline = task2?.dadline;
  const description = task2?.description;
  const author = task2?.author;
  console.log(name, dadline, description, author);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const dadline = form.dadline.value;
    const description = form.description.value;
    const author = task2?.author;
    const updateData = { name, dadline, description, author };
    console.log("update-", name, dadline, description, author);

    axios
      .put(`http://localhost:5000/projects/${id}`, updateData)
      .then((res) => {
        toast.success("Task Updated");
        router.push("/tasks");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="max-w-7xl mx-auto w-full h-screen">
      <div className="flex justify-center pt-12">
        <form onSubmit={handleUpdateTask}>
          <div className="pt-6">
            <div className="md:flex gap-5 mb-5">
              <div className="w-full">
                <h2>Name</h2>
                <input
                  defaultValue={name}
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-full">
                <h2>Dadline</h2>
                <input
                  defaultValue={dadline}
                  type="date"
                  name="dadline"
                  required
                  placeholder="Author Name"
                  className="input input-bordered w-full  "
                />
              </div>
            </div>

            <div className="md:flex gap-5  mb-5">
              <div className="w-full">
                <h2>Description</h2>
                <input
                  defaultValue={description}
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="input input-bordered w-full "
                />
              </div>
            </div>

            <button className="btn uppercase text-white btn-sm hover:bg-white glass w-full bg-[#de9c33c6] font-bold hover:text-[#090909]">
              U p d a t e
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectUpdate;
