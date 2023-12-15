"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user) {
      redirect("/");
    }
  }, [session]);

  return <div>{children}</div>;
}
