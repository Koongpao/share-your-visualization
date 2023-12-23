import { getServerAuthSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function layout({ children }: { children: React.ReactNode }) {

  const session = await getServerAuthSession();

  if (session) redirect("/");
  if (session) return null;

  return <div>{children}</div>;
}
