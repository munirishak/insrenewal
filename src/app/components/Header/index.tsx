"use client";

import { ReducerType } from "@/store";
import { Button, Navbar } from "flowbite-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyHeader() {
  const [name, setName] = useState("");

  // const sessionDetails = store.getState().auth.sessionDetails;
  const sessionDetails = useSelector((state: ReducerType) => state?.auth?.sessionDetails);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  useEffect(() => {
    setName(sessionDetails?.user?.name);
  }, [sessionDetails]);
  
  return (
    <Navbar fluid>
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black">
          Welcome, {name}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Navbar>
  );
}
