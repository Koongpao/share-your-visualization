"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { MdArrowBack } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { BsKey } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Success from "./success";
import { signIn } from "next-auth/react";
import { useAtom } from "jotai";
import { atomLoginDependency } from "@/app/atoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface LoginFormData {
  usernameOrEmail: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const router = useRouter();

  const UsernameOrEmailData = watch("usernameOrEmail");
  const PasswordData = watch("password");

  const UsernameOrEmailMaxChar = 64;
  const PasswordMaxChar = 64;

  const [UsernameOrEmailWarning, setUsernameOrEmailWarning] = useState<boolean>(false);
  const [PasswordWarning, setPasswordWarning] = useState<boolean>(false);

  const [SuccessfullyLogin, setSuccessfullyLogin] = useState<boolean>(false);
  //To allow page to switch to success.tsx

  const [FormComplete, setFormComplete] = useState<boolean>(false);
  //To allow button to be pressed or not

  const [isHidden, setIsHidden] = useState<boolean>(true);

  const [loginDependency, setLoginDependency] = useAtom(atomLoginDependency);

  useEffect(() => {
    setFormComplete(UsernameOrEmailData != "" && PasswordData != "");
  }, [UsernameOrEmailData, PasswordData]);

  const handleLogin = async (data: LoginFormData) => {
    setFormComplete(false);
    const signInResult = await signIn("credentials", {
      usernameOrEmail: UsernameOrEmailData,
      password: PasswordData,
      redirect: false,
      callbackUrl: "/",
    });
    setUsernameOrEmailWarning(!signInResult?.ok);
    setPasswordWarning(!signInResult?.ok);
    if (signInResult?.ok) {
      setSuccessfullyLogin(true);
      setLoginDependency(true);
    } else {
      toast.info("Incorrect username or password", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
      });
    }
  };

  if (SuccessfullyLogin) return <Success />;

  return (
    <div className="container w-screen h-screen px-12">
      <div className="absolute mt-6">
        <Link href="/">
          <div className="flex flex-row items-center gap-2">
            <MdArrowBack className="text-3xl text-slate-700" />
            <div className="text-slate-700 font-bold text-lg">Home</div>
          </div>
        </Link>
      </div>
      <form
        className="w-full sm:w-3/4 lg:w-3/5 xl:w-1/2 mx-auto flex flex-col justify-center items-center h-screen gap-y-6"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="font-bold text-4xl text-teal-700">Log in</div>
        <div className="w-full lg:w-1/2 my-6 flex gap-y-2 flex-col text-slate-500">
          <Input
            size={"sm"}
            className=""
            label={
              <div className="flex flex-row items-center gap-1">
                <FiUser />
                Username or Email
              </div>
            }
            type="text"
            isInvalid={UsernameOrEmailWarning}
            maxLength={UsernameOrEmailMaxChar}
            {...register("usernameOrEmail", { required: true, maxLength: UsernameOrEmailMaxChar })}
          />
          <Input
            size={"sm"}
            className=""
            label={
              <div className="flex flex-row items-center gap-1">
                <BsKey />
                Password
              </div>
            }
            type={isHidden ? "password" : "text"}
            isInvalid={PasswordWarning}
            maxLength={PasswordMaxChar}
            {...register("password", { required: true, maxLength: PasswordMaxChar })}
            endContent={
              <button className="focus:outline-none" type="button" onClick={() => setIsHidden((prev) => !prev)}>
                {isHidden ? (
                  <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
        </div>
        <div className="w-full lg:w-1/2">
          <Button
            isDisabled={!FormComplete}
            // onClick={() => handleLogin()}
            className="bg-teal-600 w-full text-white font-semibold"
            type="submit"
          >
            Log In
          </Button>
        </div>
        <div className="w-full lg:w-1/2 border-b"></div>
        <div className="text-slate-400 font-semibold">or</div>
        <div>
          <p className="text-slate-400 font-semibold">
            Don&rsquo;t have an account?{" "}
            <Link className="text-teal-600" href="/sign-up">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
