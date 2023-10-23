"use server";

import { UserType } from "@/app/store/slices/usersSlice";

export async function getUsersApi(currPage: number) {
  const res = await fetch("https://reqres.in/api/users?page=" + currPage);
  let respData = await res.json();

  console.log("Server ke")

  respData.data = respData.data.filter(
    (user: UserType) =>
      user?.first_name[0]?.toLowerCase() === "g" ||
      user?.last_name[0]?.toLowerCase() === "w"
  );

  return respData;
}
