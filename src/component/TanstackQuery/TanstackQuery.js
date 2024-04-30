"use client";
import axios from "axios";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Tasks = () => {
  const [allTask, setAllTask] = useState([]);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  //  function of add-task button (add task of todo api)
  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const title = form.title.value;
    const dadline = form.dadline.value;
    const description = form.description.value;
    const position = "to-do";
    const author = user?.email;
    form.reset();
    const updateData = { name, title, dadline, description, position, author };

    // post new task on todo API
    const res = await axios
      .post("http://localhost:5000/todo", updateData)
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
    queryKey: ["todo"],
    queryFn: async () => {
      const res = await axios
        .get("http://localhost:5000/todo")
        .then((res) => {
          setAllTask(res?.data);
        })
        .catch(() => {});
    },
  });

  // (redirect to login)  When user trying to go tasks page without login then he redirect to login page
  if (loading) {
    return (
      <div className="flex justify-center text-center items-start pt-20 h-[100vh]">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    );
  }
  if (!user) {
    toast.success("Login Required");
    router.push("/login");
    return null;
  }

  //  filter all task from todo API by login user (only user task shown)
  const filterTasks = allTask?.filter((task) => task?.author == user?.email);

  // Update position of Todo API tasks
  // (position >> to-do to ongoing)
  const handleOngoing = (id) => {
    const position = "ongoing";
    const newData = { position };
    axios
      .patch(`http://localhost:5000/todo/${id}`, newData)
      .then((res) => {
        refetch();
        toast.success("To-Do to Ongoing");
      })
      .catch((err) => {});
  };
  //  (position >> ongoing to completed)
  const handleCompleted = (id) => {
    const position = "completed";
    const newData = { position };
    axios
      .patch(`http://localhost:5000/todo/${id}`, newData)
      .then((res) => {
        refetch();
        toast.success("Ongoing to Completed");
      })
      .catch((err) => {});
  };

  // Delete function of todo data (position completed to delete)
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/todo/${id}`)
      .then((res) => {
        refetch();
        toast.success("Task Deleted");
      })
      .catch(() => {});
  };

  return (
    <div className="max-w-7xl mx-auto h-screen">
      {/* Using Modal for add task on todo API */}
      <div>
        <div className="flex items-center justify-center pt-12">
          <button
            className="btn btn-sm glass bg-white hover:text-[#ffffff] text-black font-bold"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add Task
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
            <h3 className="font-bold text-lg text-center">Add you task!</h3>

            <form method="dialog" onSubmit={handleAddTask}>
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
                    <h2>Title</h2>
                    <input
                      type="img"
                      name="title"
                      placeholder="Tite"
                      required
                      className="input input-bordered  w-full"
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
        {/* All To-Do task */}
        <div className="bg-red-300 flex-1 rounded-lg glass">
          <h2 className="text-center text-xl font-bold py-2">To-Do</h2>
          <hr />
          <div>
            <div className="overflow-x-auto">
              <table className="table ">
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
                  {/* filter all task by position(to-do) then map */}
                  {filterTasks
                    ?.filter((task) => task?.position === "to-do")
                    .map((task, ind) => (
                      <tr key={task?._id}>
                        <th>{ind + 1}</th>
                        <td>{task?.name}</td>
                        <td>{task?.dadline}</td>
                        <td>
                          <div className="flex">
                            {/* Action button (Ongoing) */}
                            <div className="pb-2">
                              <button
                                onClick={() => handleOngoing(task._id)}
                                className="bg-yellow-600 rounded-md font-semibold text-white px-1"
                              >
                                Ongoing
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
                  {filterTasks
                    ?.filter((task) => task?.position === "ongoing")
                    .map((task, ind) => (
                      <tr key={task?._id}>
                        <th>{ind + 1}</th>
                        <td>{task.name}</td>
                        <td>{task.dadline}</td>
                        <td>
                          {/* Acion button (Completed) */}
                          <div className="flex">
                            <div>
                              <div>
                                <button
                                  className="bg-green-600   rounded-md font-semibold text-white px-1"
                                  onClick={() => handleCompleted(task._id)}
                                >
                                  Completed
                                </button>
                              </div>
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

        {/* All completed task */}
        <div className="bg-green-300 flex-1 mt-6 md:mt-0 rounded-lg glass">
          <h2 className="text-center text-xl font-bold py-2">Completed</h2>
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
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {/* filter all task by position(completed) then map */}
                  {filterTasks
                    ?.filter((task) => task?.position === "completed")
                    .map((task, ind) => (
                      <tr key={task?._id}>
                        <th>{ind + 1}</th>
                        <td>{task.name}</td>
                        <td>{task.dadline}</td>
                        <td>
                          {/* Action button (delete) */}
                          <div className="flex">
                            <div className="pb-2">
                              <button
                                className="bg-red-600 rounded-md font-semibold text-white px-1"
                                onClick={() => handleDelete(task._id)}
                              >
                                Delete
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

export default Tasks;
