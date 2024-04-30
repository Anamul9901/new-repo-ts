import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto pt-2">
      {/* Banner section */}
      <div className="carousel w-full lg:h-[700px] h-[550px] rounded-lg px-1">
        <div className="carousel-item relative w-full">
          <Image
            src="https://i.ibb.co/rtKx5dW/bacground.jpg"
            alt="alt"
            width={2000}
            height={400}
          />
          <div className="absolute md:flex md:flex-row-reverse justify-around items-center text-white bg-gradient-to-r from-[#0303030f] to-[#10355255] w-full h-full">
            <div className="flex justify-center items-center pt-8 pb-14">
              <Image
                src="https://i.ibb.co/CVLTqt8/Lovepik-com-832217352-Complete-task-25-D-vector-business-people-office-commercial-eleme.png"
                alt="alt"
                width={300}
                height={300}
              />
            </div>

            <div className=" md:space-y-6 text-center items-center">
              <h2 className="md:text-4xl text-2xl font-bold pb-4 md:pb-0">
                FREE TASK TIME TRACKING
              </h2>
              <h2 className="md:text-6xl text-center text-xl font-bold visible">
                <Link href={"/tasks"}>
                  <button className="btn glass btn-sm md:btn-md bg-[#daa11ed0] text-white font-bold uppercase hover:bg-white hover:text-black">
                    Explore
                  </button>
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>


      {/* Why TASKMASTER? section */}
      <div className="flex justify-center items-center pt-6 pb-12 px-1">
        <div className="md:flex justify-around items-center gap-10 bg-gray-700 pb-20 w-full h-[550px] rounded-lg ">
          <div className="flex justify-center items-center pt-10">
            <Image
              src="https://www.bitrix24.com/upload/optimizer/converted/images/content_en/product/tasks_and_projects/free_online_task_manager/img_why.png.webp?1701181440000"
              alt="alt"
              width={300}
              height={300}
            />
          </div>

          <div className="text-center items-center pt-14">
            <h2 className="text-3xl font-bold pb-2 md:pb-10">
              Why TASKMASTER?
            </h2>
            <p className="pb-6">
              When it comes down to choosing task time tracking freeware, <br />{" "}
              all you need is three things: To-Do, Ongoing, Completed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
