"use client"

import { setAuth, setSession } from "@/app/store/slices/authSlice";
import { Button } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    setIsLoading(true);
    signIn("google")
  }

  useEffect(() => {
    setIsLoading(status !== "unauthenticated");

    if (status === "authenticated") {
      dispatch(setSession(session));
      dispatch(setAuth(true));
      router.replace("home");
    }

  },[status]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={handleLogin} isProcessing={isLoading} disabled={isLoading}>Login With Google</Button>
    </main>
  );
}
