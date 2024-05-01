"use client";
import axios from "axios";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdUpdate } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const Projects = () => {
  const [allProject, setAllProject] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [storeId, setStoreId] = useState("");
  const router = useRouter();
  console.log(user?.email);

  //  function of add-task button (add task of todo api)
  const handleAddProject = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const dadline = form.dadline.value;
    const description = form.description.value;
    const author = user?.email;
    form.reset();
    const updateData = { name, dadline, description, author };

    // post new task on todo API
    const res = await axios
      .post("https://ph-job-tasks.vercel.app/projects", updateData)
      .then((res) => {
        toast.success("Task added");
        refetch();
      })
      .catch((err) => {
        toast.error("There is a problem");
      });
  };

  // get todo api data (using TanstackQuery for easy refetch)
  const { data, refetch } = useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const res = await axios
        .get("https://ph-job-tasks.vercel.app/projects")
        .then((res) => {
          setAllProject(res?.data);
        })
        .catch(() => {});
    },
  });
  console.log(allProject);

  // (redirect to login)  When user trying to go tasks page without login then he redirect to login page
  if (loading) {
    return (
      <div className="flex justify-center text-center items-start pt-20 h-[100vh]">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    );
  }
  if (!user) {
    toast.error("Login Required");
    router.push("/login");
    return null;
  }

  //  filter all task from todo API by login user (only user task shown)
  const filterProjects = allProject?.filter(
    (project) => project?.author == user?.email
  );
  console.log(filterProjects);

  // Delete function of todo data (position completed to delete)
  const handleDelete = (id) => {
    axios
      .delete(`https://ph-job-tasks.vercel.app/projects/${id}`)
      .then((res) => {
        refetch();
        toast.success("Project Deleted");
      })
      .catch(() => {});
  };

  const handleUpdate = (id) => {
    console.log(id);
    router.push(`projects/${id}`);
  };

  const handleShow = (id) =>{
    console.log(id);
    localStorage.setItem('id', id)
    router.push('tasks')
  }

  return (
    <div className="max-w-7xl mx-auto h-screen">
      {/* Using Modal for add task on todo API */}
      <div>
        <div className="flex items-center justify-center pt-12">
          <button
            className="btn btn-sm glass bg-white hover:text-[#ffffff] text-black font-bold"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add Project
          </button>
        </div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 glass">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-center">Add new project!</h3>

            <form method="dialog" onSubmit={handleAddProject}>
              <div className="pt-6">
                <div className="md:flex gap-5 mb-5">
                  <div className="w-full">
                    <h2>Name</h2>
                    <input
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
                      type="text"
                      name="description"
                      placeholder="Description"
                      className="input input-bordered w-full "
                    />
                  </div>
                </div>

                <button className="btn text-white btn-sm hover:bg-white glass w-full bg-[#de9c33c6] font-bold hover:text-[#090909]">
                  S u b m i t
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      {/* Finished Modal */}

      <div className="md:flex justify-between pt-4 text-black px-2 rounded-lg gap-2">
        {/* All Ongoing task */}
        <div className="bg-yellow-300 flex-1 mt-6 md:mt-0 rounded-lg glass">
          <h2 className="text-center text-xl font-bold py-2">Ongoing</h2>
          <hr />
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-black">
                    <th>No.</th>
                    <th>Name</th>
                    <th>Dadline</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* body */}
                <tbody>
                  {/* filter all task by position(ongoing) then map */}
                  {filterProjects?.map((project, ind) => (
                    <tr key={project?._id}>
                      <th>{ind + 1}</th>
                      <td>{project.name}</td>
                      <td>{project.dadline}</td>
                      <td>
                        {/* Acion button (Completed) */}
                        <div className="flex">
                          <div className="pb-2 flex gap-1">
                            <button
                              className="rounded-md font-semibold text-xl text-red-500"
                              onClick={() => handleDelete(project._id)}
                            >
                              <IoTrashBinSharp />
                            </button>
                            <button
                              className="rounded-md font-semibold text-xl text-green-500"
                              onClick={() => handleUpdate(project._id)}
                            >
                              <MdUpdate />
                            </button>

                            <button
                              className="rounded-md font-semibold text-xl text-green-500"
                              onClick={() => handleShow(project._id)}
                            >
                              <FaEye />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
