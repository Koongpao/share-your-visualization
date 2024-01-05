'use client'
import { FaRegCopy } from "react-icons/fa";
import ClipboardJS from "clipboard";
import { toast, ToastContainer } from "react-toastify";

export default function CopyIcon({ sourceCode }: { sourceCode: string }) {
  const handleCopy = () => {
    ClipboardJS.copy(sourceCode);
    toast.info("Text copied to clipboard", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div
      id="#copy-code"
      className="text-lg text-slate-500 cursor-pointer flex flex-row items-center gap-x-1"
      onClick={handleCopy}
    >
      <FaRegCopy />
      Copy
      <ToastContainer />
    </div>
  );
}
