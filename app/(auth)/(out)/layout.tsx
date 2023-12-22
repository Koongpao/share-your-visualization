"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (Loading) return null

  return <div>{children}</div>;
};

export default layout;