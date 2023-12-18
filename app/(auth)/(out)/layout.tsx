"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, []);

  if (!token) return null

  return <div>{children}</div>;
};

export default layout;