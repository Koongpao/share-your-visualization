"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

import { MdArrowBack, MdOutlineEmail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { BsKey } from "react-icons/bs";

import { handleOnChange } from "@/app/lib/functions";
import Success from "./success";
import { SignUp } from "@/app/lib/controller";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Page() {
  const [UsernameData, setUsernameData] = useState<string>("");
  const [EmailData, setEmailData] = useState<string>("");
  const [PasswordData, setPasswordData] = useState<string>("");
  const [ConfirmPasswordData, setConfirmPasswordData] = useState<string>("");

  const UsernameMaxChar = 20;
  const EmailMaxChar = 64;
  const PasswordMaxChar = 64;

  const [UsernameWarning, setUsernameWarning] = useState<boolean>(false);
  const [EmailWarning, setEmailWarning] = useState<boolean>(false);
  const [PasswordWarning, setPasswordWarning] = useState<boolean>(false);
  const [CfPasswordWarning, setCfPasswordWarning] = useState<boolean>(false);

  const [UsernameErrMessage, setUsernameErrMessage] = useState<string>("");
  const [EmailErrMessage, setEmailErrMessage] = useState<string>("");
  const [PasswordErrMessage, setPasswordErrMessage] = useState<string>("");
  const [CfPasswordErrMessage, setCfPasswordErrMessage] = useState<string>("");

  const [formComplete, setFormComplete] = useState<boolean>(false);
  //To allow button to be pressed or not

  const [SuccessfullySignUp, setSuccessfullySignUp] = useState<boolean>(false)
  //To allow page to switch to success.tsx

  const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(true);
  const [isHiddenCfPassword, setIsHiddenCfPassword] = useState<boolean>(true);

  const CheckUsername = () => {
    if (UsernameData !== "" && UsernameData.length < 4) {
      setUsernameWarning(true);
      setUsernameErrMessage("Must be atleast 4-20 Characters");
    } else {
      setUsernameWarning(false);
      setUsernameErrMessage("");
    }
  };
  useEffect(() => {
    CheckUsername();
  }, [UsernameData]);

  const CheckEmailRegex = () => {
    if (EmailData != "" && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(EmailData)) {
      setEmailWarning(true);
      setEmailErrMessage("Must be a valid email");
    } else {
      setEmailWarning(false);
      setEmailErrMessage("");
    }
  };
  useEffect(() => {
    CheckEmailRegex();
  }, [EmailData]);

  const CheckPassword = () => {
    if (PasswordData != "" && PasswordData.length < 4) {
      setPasswordWarning(true);
      setPasswordErrMessage("Password must be atleast 4 Characters");
    } else {
      setPasswordWarning(false);
      setPasswordErrMessage("");
    }
  };
  useEffect(() => {
    CheckPassword();
    CheckCfPassword();
  }, [PasswordData]);

  const CheckCfPassword = () => {
    if (ConfirmPasswordData != "" && ConfirmPasswordData != PasswordData) {
      setCfPasswordWarning(true);
      setCfPasswordErrMessage("Password must match");
    } else {
      setCfPasswordWarning(false);
      setCfPasswordErrMessage("");
    }
  };
  useEffect(() => {
    CheckCfPassword();
  }, [ConfirmPasswordData]);

  useEffect(() => {
    setFormComplete(
      UsernameData !== "" &&
        EmailData !== "" &&
        PasswordData !== "" &&
        ConfirmPasswordData !== "" &&
        UsernameWarning == false &&
        EmailWarning == false &&
        PasswordWarning == false &&
        CfPasswordWarning == false
    );
  }, [UsernameWarning, EmailWarning, PasswordWarning, CfPasswordWarning]);

  //BACKEND ERROR CODE
  //1: Username Already Taken
  //2: Email Already Taken

  const handleSubmitSignUp = async () => {
    setFormComplete(false)
    //Prevent Clicking button multiple times
    const body = {
      username: UsernameData,
      email: EmailData,
      password: PasswordData,
    };
    const res = await SignUp(body);
    if(res.error_code === 1){
      setUsernameWarning(true)
      setUsernameErrMessage("This username is already taken")
    }
    if(res.error_code === 2){
      setEmailWarning(true)
      setEmailErrMessage("This email is already taken")
    }
    if(res.success){
      setSuccessfullySignUp(true)
    }
    toast.info(res.message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      type: res.success? "info": "error",
      theme: "light",
    });
  };
  if (SuccessfullySignUp) return <Success/>

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
      <div className="w-full sm:w-3/4 lg:w-3/5 xl:w-1/2 mx-auto flex flex-col justify-center items-center h-screen gap-y-6">
        {/* <form className="w-full flex flex-col justify-center items-center gap-y-6"> */}
        <div className="font-bold text-4xl text-teal-700">Sign up</div>
        <div className="w-full sm:w-1/2 my-6 flex flex-col gap-y-2 text-slate-500">
          <Input
            size={"sm"}
            className=""
            label={
              <div className="flex flex-row items-center gap-1">
                <FiUser />
                Username
              </div>
            }
            type="text"
            onChange={(e) => {
              handleOnChange(e, setUsernameData, UsernameMaxChar);
            }}
            value={UsernameData}
            isInvalid={UsernameWarning}
            errorMessage={UsernameWarning && UsernameErrMessage}
          />
          <Input
            size={"sm"}
            className=""
            label={
              <div className="flex flex-row items-center gap-1">
                <MdOutlineEmail />
                Email
              </div>
            }
            type="email"
            onChange={(e) => {
              handleOnChange(e, setEmailData, EmailMaxChar);
            }}
            value={EmailData}
            isInvalid={EmailWarning}
            errorMessage={EmailWarning && EmailErrMessage}
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
            type={isHiddenPassword ? "password" : "text"}
            onChange={(e) => {
              handleOnChange(e, setPasswordData, PasswordMaxChar);
            }}
            value={PasswordData}
            isInvalid={PasswordWarning}
            errorMessage={PasswordWarning && PasswordErrMessage}
            endContent={
              <button className="focus:outline-none" type="button" onClick={() => setIsHiddenPassword((prev) => !prev)}>
                {isHiddenPassword ? (
                  <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <div className="flex flex-col">
            <Input
              size={"sm"}
              className=""
              label={
                <div className="flex flex-row items-center gap-1">
                  <BsKey />
                  Confirm Password
                </div>
              }
              type={isHiddenCfPassword ? "password" : "text"}
              onChange={(e) => {
                handleOnChange(e, setConfirmPasswordData, UsernameMaxChar);
              }}
              value={ConfirmPasswordData}
              isInvalid={CfPasswordWarning}
              errorMessage={CfPasswordWarning && CfPasswordErrMessage}
              endContent={
                <button className="focus:outline-none" type="button" onClick={() => setIsHiddenCfPassword((prev) => !prev)}>
                  {isHiddenCfPassword ? (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            {/* {showPasswordWarn && <div className="">Test Text</div>} */}
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <Button
            isDisabled={!formComplete}
            className="bg-teal-600 w-full text-white font-semibold"
            onClick={() => handleSubmitSignUp()}
          >
            Sign up
          </Button>
        </div>
        {/* </form> */}
        <div className="w-full sm:w-1/2 border-b"></div>
        <div className="text-slate-400 font-semibold">or</div>
        <div>
          <p className="text-slate-400 font-semibold">
            Already have an account?{" "}
            <Link className="text-teal-600" href="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
