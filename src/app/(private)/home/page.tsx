"use client";

import { Avatar, Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";

type UserType = {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  show_email?: boolean;
};

type PageData = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserType[];
};

const callUserApi = async (currPage: number) => {
    const resp = await fetch("https://reqres.in/api/users?page=" + currPage);
    return await resp.json();
  };

export default function Home() {
  const [users, setUsers] = useState<UserType[]>([]);

  const getUsers = async () => {
    let currPage = 1;

    let usersResp: UserType[] = [];
    let pageResp = await callUserApi(currPage);

    while (currPage <= pageResp.total_pages) {
      if (currPage > 1) pageResp = await callUserApi(currPage);

      usersResp = [
        ...usersResp,
        ...pageResp?.data?.filter((row: UserType) => {
          return (
            row?.first_name[0]?.toLowerCase() === "g" ||
            row?.last_name[0]?.toLowerCase() === "w"
          );
        }),
      ];
      currPage += 1;
    }
    
    console.log(usersResp);
    setUsers(usersResp);
  };

  const toggleEmail = (idx: number) => () => {
    setUsers(
      users?.map((usr: UserType, inIdx: number) => {
        return {
          ...usr,
          show_email:
            idx === inIdx
              ? usr.show_email === true
                ? false
                : true
              : usr.show_email,
        };
      })
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      {users?.map((user: UserType, idx: number) => (
        <Card key={"users"+user.id} className="m-3 md:">
          <div key={user.id} className="flex flex-col items-center pb-10">
            <Avatar img={user.avatar} size="xl" />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.first_name}, {user.last_name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.show_email === true
                ? user.email
                : user.email.replace(
                    /^(.)(.*)(.@.*)$/,
                    (_, a, b, c) => a + b.replace(/./g, "*") + c
                  )}
            </span>
            <Button className="mt-2" onClick={toggleEmail(idx)}>
              {user.show_email === true ? "Hide" : "Show"} Email
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
