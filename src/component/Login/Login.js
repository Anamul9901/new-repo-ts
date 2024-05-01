"use client";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Button, Form, Input, Typography } from "antd";

const Login = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  // function of login button
  const handleLogin = async (e) => {
    // console.log(e.email, e.password);
    try {
      const res = await signInWithEmailAndPassword(e?.email, e?.password);
      if (res) {
        router.push("/");
        toast.success("Login Successful");
      } else {
        toast.error("Email & Password Incorrect");
      }
    } catch {
      toast.error("Email & Password Incorrect");
    }
  };

  return (
    <div className="styleSign h-[100vh] bg-blue-100">
      <div className="flex justify-center h-[80vh] items-center">
        <div className="relative  flex w-96 flex-col rounded-xl bg-blue-200 glass bg-clip-border text-gray-700 shadow-2xl">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-400 to-blue-200 bg-clip-border text-white shadow-lg shadow-blue-500/40">
            <Typography.Title>Sign In</Typography.Title>
          </div>

          {/* login form */}
          <Form onFinish={handleLogin}>
            <div className="px-4 pt-2">
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
                    message: "Please enter you password",
                  },
                ]}
                label="Password"
                name={"password"}
              >
                <Input.Password placeholder="Entter your password" />
              </Form.Item>
              <Button
                className="bg-blue-400 glass text-white font-semibold"
                htmlType="submit"
                block
              >
                Sign In
              </Button>
            </div>
          </Form>

          {/* others */}
          <div className="p-6 pt-0">
            <p className="mt-6  flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              Do not have an account?
              <Link href="/signup">
                <button
                  href="signup"
                  className="ml-1 block font-sans text-sm font-bold leading-normal  text-blue-500 antialiased "
                >
                  Sign Up
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
