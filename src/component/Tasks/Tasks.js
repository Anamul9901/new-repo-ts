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
import { MdSearch } from "react-icons/md";

const Tasks = () => {
  const [allTask, setAllTask] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [storeId, setStoreId] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const id = localStorage.getItem("id");
  // console.log(id);

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
    const projectId = localStorage.getItem("id");
    form.reset();
    const updateData = {
      name,
      title,
      dadline,
      description,
      position,
      author,
      projectId,
    };

    // post new task on todo API
    const res = await axios
      .post("https://66312420c92f351c03dc4ed6.mockapi.io/todo/tasks", updateData)
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
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios
        .get(`https://66312420c92f351c03dc4ed6.mockapi.io/todo/tasks?name=${search}`)
        .then((res) => {
          setAllTask(res?.data);
        })
        .catch(() => {});
    },
  });

  const { data2, refetch2 } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios
        .get(`https://66312420c92f351c03dc4ed6.mockapi.io/todo/projects`)
        .then((res) => {
          setAllProjects(res?.data);
        })
        .catch(() => {});
    },
  });
  const findProjects = allProjects.find((project) => project._id == id);
  // console.log(findProjects);

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
  // console.log(allTask);
  //  filter all task from todo API by login user (only user task shown)
  const filterTasks = allTask?.filter(
    (task) => task?.author == user?.email && task?.projectId == id
  );
  // console.log(filterTasks);
  // Update position of Todo API tasks
  // (shift To-do)
  const handleToDo = (id) => {
    const position = "to-do";
    const newData = { position };
    axios
      .put(`https://66312420c92f351c03dc4ed6.mockapi.io/todo/tasks/${storeId}`, newData)
      .then((res) => {
        refetch();
        toast.success("Shift Ongoing");
      })
      .catch((err) => {});
  };

  // (Shift ongoing)
  const handleOngoing = (id) => {
    const position = "ongoing";
    const newData = { position };
    axios
      .put(`https://66312420c92f351c03dc4ed6.mockapi.io/todo/tasks/${storeId}`, newData)
      .then((res) => {
        refetch();
        toast.success("Shift Ongoing");
      })
      .catch((err) => {});
  };

  //  (Shift completed)
  const handleCompleted = (id) => {
    const position = "completed";
    const newData = { position };
    axios
      .put(`https://66312420c92f351c03dc4ed6.mockapi.io/todo/tasks/${storeId}`, newData)
      .then((res) => {
        refetch();
        toast.success("Shift Completed");
      })
      .catch((err) => {});
  };

  // Delete function of todo data (position completed to delete)
  const handleDelete = (id) => {
    axios
      .delete(`https://66312420c92f351c03dc4ed6.mockapi.io/todo/tasks/${id}`)
      .then((res) => {
        refetch();
        toast.success("Task Deleted");
      })
      .catch(() => {});
  };

  const handleUpdate = (id) => {
    // console.log(id);
    router.push(`tasks/${id}`);
  };
  const dragStarted = (e, id) => {
    setStoreId(id);
  };
  console.log("store Id-", storeId);

  const draggingOver = (e) => {
    e.preventDefault();
    console.log("Dragging Over Now");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    // console.log(searchText);
    refetch();
    setSearch(searchText);
  };
  console.log(search);

  return (
    <div className="max-w-7xl mx-auto h-screen">
      {/* Using Modal for add task on todo API */}
      <div>
        <div className="text-center pt-4">
          <h2 className="text-white text-xl font-semibold">
            Name: {findProjects?.name}
          </h2>
        </div>
        <div className="flex items-center justify-end pr-2">
          <div className=" pr-2">
            {/* add task start */}
            <button
              className="btn btn-sm glass bg-white hover:text-[#ffffff] text-black font-bold"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Add Task
            </button>
            {/* add task end */}
          </div>
          <div className="w-xl">
            <input
              type="date"
              name="dadline"
              required
              placeholder="Author Name"
              className="input input-bordered w-full"
            />
          </div>
          {/* search option start */}
          <div className="text-center text-white flex justify-center items-center">
            <form onSubmit={handleSearch}>
              <div className="flex items-center justify-end ">
                <div>
                  <input
                    type="text"
                    id="id"
                    name="search"
                    placeholder="Search by Name"
                    className="w-[220px] border border-slate-400 bg-blue-200/15 rounded-l-md py-2 px-5 outline-none	"
                  />
                </div>
                <div className="rounded-r-md ">
                  <button
                    type="submit"
                    value="Search"
                    className="px-2 w-[70px] border border-l-0 border-slate-400 rounded-r-md py-2 outline-none	bg-blue-200/15 hover:bg-slate-500 flex justify-center items-center"
                  >
                    <MdSearch className="text-2xl text-indigo-200/100" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* search option end */}
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

      <div className="md:flex justify-between pt-1 text-black px-2 rounded-lg gap-2">
        {/* All To-Do task */}
        <div
          droppable
          onDragOver={(e) => draggingOver(e)}
          onDrop={(e) => handleToDo(e)}
          className="bg-red-300 flex-1 rounded-lg glass"
        >
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
                      <tr
                        draggable
                        onDragStart={(e) => dragStarted(e, task?._id)}
                        key={task?._id}
                      >
                        <th>{ind + 1}</th>
                        <td>{task?.name}</td>
                        <td>{task?.dadline}</td>
                        <td>
                          <div className="flex">
                            {/* Action button (Ongoing) */}
                            <div className="flex">
                              <div className="pb-2 flex gap-1">
                                <button
                                  className="rounded-md font-semibold text-xl text-red-500"
                                  onClick={() => handleDelete(task._id)}
                                >
                                  <IoTrashBinSharp />
                                </button>
                                <button
                                  className="rounded-md font-semibold text-xl text-green-500"
                                  onClick={() => handleUpdate(task._id)}
                                >
                                  <MdUpdate />
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

        {/* All Ongoing task */}
        <div
          droppable
          onDragOver={(e) => draggingOver(e)}
          onDrop={(e) => handleOngoing(e)}
          className="bg-yellow-300 flex-1 mt-6 md:mt-0 rounded-lg glass"
        >
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
                      <tr
                        draggable
                        onDragStart={(e) => dragStarted(e, task?._id)}
                        key={task?._id}
                      >
                        <th>{ind + 1}</th>
                        <td>{task.name}</td>
                        <td>{task.dadline}</td>
                        <td>
                          {/* Acion button (Completed) */}
                          <div className="flex">
                            <div className="pb-2 flex gap-1">
                              <button
                                className="rounded-md font-semibold text-xl text-red-500"
                                onClick={() => handleDelete(task._id)}
                              >
                                <IoTrashBinSharp />
                              </button>
                              <button
                                className="rounded-md font-semibold text-xl text-green-500"
                                onClick={() => handleUpdate(task._id)}
                              >
                                <MdUpdate />
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

        {/* All completed task */}
        <div
          droppable
          onDragOver={(e) => draggingOver(e)}
          onDrop={(e) => handleCompleted(e)}
          className="bg-green-300 flex-1 mt-6 md:mt-0 rounded-lg glass"
        >
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* filter all task by position(completed) then map */}
                  {filterTasks
                    ?.filter((task) => task?.position === "completed")
                    .map((task, ind) => (
                      // droppable
                      //   onDragOver={(e) => draggingOver(e)}
                      //   onDrop={(e) => handleOngoing(e)}
                      <tr
                        draggable
                        onDragStart={(e) => dragStarted(e, task?._id)}
                        key={task?._id}
                      >
                        <th>{ind + 1}</th>
                        <td>{task.name}</td>
                        <td>{task.dadline}</td>
                        <td>
                          {/* Action button (delete) */}
                          <div className="flex">
                            <div className="pb-2 flex gap-1">
                              <button
                                className="rounded-md font-semibold text-xl text-red-500"
                                onClick={() => handleDelete(task._id)}
                              >
                                <IoTrashBinSharp />
                              </button>
                              <button
                                className="rounded-md font-semibold text-xl text-green-500"
                                onClick={() => handleUpdate(task._id)}
                              >
                                <MdUpdate />
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
