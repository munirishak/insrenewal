"use client";

import { Button, Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if(status === "authenticated"){
      router.replace("/home")
    }
  },[status]);
  
  return (
    <div>
      {children}
    </div>
  );
}
