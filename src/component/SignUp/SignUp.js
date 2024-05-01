/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import axios from "axios";
import { UploadImage } from "../PhotoFile/utilites";
import toast from "react-hot-toast";
import { Button, Form, Input, Typography, Upload } from "antd";

const SignUp = () => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  // function of singUp button
  const handleRegister = async (e) => {
    // e.preventDefault();
    // const form = e.target;
    const name = e.name;
    const email = e.email;
    const password = e.password;
    // console.log(e.photo.file.originFileObj);

    const image = e.photo.file.originFileObj
    ;
    const imageData =await UploadImage(image);
    const photo = imageData?.data?.display_url;
    const user = { name, email, photo};

    // console.log(user);

    try {
      const res = await createUserWithEmailAndPassword(email, password);

      // user data post on server api when register
      if (res) {
        axios
          .post("https://663242b4c51e14d69563e282.mockapi.io/todo/users", user)
          .then((res) => {
            router.push("/");
            toast.success("SignUp Successful");
          })
          .catch((err) => {
            toast.error(err);
          });
      } else {
        toast.error("Something is wrong");
      }
    } catch {
      toast.error("Something is wrong");
    }
  };

  return (
    <div className="styleSign h-[100vh] bg-blue-100">
      <div className="flex justify-center h-[80vh] items-center">
        <div className="relative flex w-96 flex-col rounded-xl bg-blue-200 glass bg-clip-border text-gray-700 shadow-2xl">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-400 to-blue-200 bg-clip-border text-white shadow-lg shadow-blue-500/40">
            <Typography.Title>Sign In</Typography.Title>
          </div>

          {/* sign Up form */}
          <Form onFinish={handleRegister}>
            <div className="px-4 pt-2">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
                label="Name"
                name={"name"}
              >
                <Input placeholder="Entter your name" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter valid email",
                  },
                ]}
                label="Email"
                name={"email"}
              >
                <Input placeholder="Entter your email" />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter password",
                  },
                ]}
                label="Password"
                name={"password"}
              >
                <Input.Password placeholder="Entter your password" />
              </Form.Item>
              <Form.Item rules={[
                {
                  required: true,
                  message: "Please upload photo"
                }
              ]} label="Profile Picture" name={"photo"}>
                <Upload>
                  <Button className="bg-white">Upload Profile Picture</Button>
                </Upload>
              </Form.Item>

              {/* file photo */}
              {/* <div className="form-control">
                <label className="label">
                  <span className=" text-sm text-black">Upload Photo</span>
                </label>
                <input
                  required
                  name="photo"
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs bg-gray-700 text-white"
                />
              </div> */}

              <Button
                className="bg-blue-400 glass text-white font-semibold"
                htmlType="submit"
                block
              >
                Sign Un
              </Button>
            </div>
          </Form>

          {/* others info */}
          <div className="p-6 pt-0">
            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              Already have an account?
              <Link href="/login">
                <button
                  href="#signup"
                  className="ml-1 block font-sans text-sm font-bold leading-normal text-blue-500 antialiased "
                >
                  Sign In
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
