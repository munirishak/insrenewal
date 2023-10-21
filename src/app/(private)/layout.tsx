"use client";

import MyFooter from "@/components/Footer";
import MyHeader from "@/components/Header";
import { Alert, Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  return (
    <div>
      {status === "authenticated" && (
        <>
          <MyHeader />
          <div className="mb-20">{children}</div>
          <MyFooter />
        </>
      )}
      {status === "unauthenticated" && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span>
            <p>
              <span className="font-medium">Unauthorized!</span>
              Please login to view this page{" "}
              <Button onClick={() => router.replace("login")}>Login</Button>
            </p>
          </span>
        </Alert>
      )}
    </div>
  );
}
