"use client"

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "@/app/store";
import { UserType, clearUsers, setUsersList, toggleEmail } from "@/app/store/slices/usersSlice";
import UserCard from "./component/UserCard";
import { getUsersApi } from "./service";

export default function Home() {
  const dispatch = useDispatch();
  const usersList = useSelector((state: ReducerType) => state?.users?.users);

  const callUserApi = async (currPage: number) => {
    const resp = await getUsersApi(currPage);
    console.log(resp)
    dispatch(setUsersList(resp));
  };

  const handleToggleEmail = (idx: number) => {
    dispatch(toggleEmail(idx));
  };

  const handleData = useCallback(() => {
    if (usersList.page === 0 || usersList.page + 1 <= usersList.total_pages) {
      callUserApi(usersList.page + 1);
    }
  }, [usersList, callUserApi]);

  useEffect(() => {
    handleData();
  }, [usersList, handleData]);

  useEffect(() => {
    return () => {
      dispatch(clearUsers());
    };
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      {usersList?.data?.map((user: UserType, idx: number) => (
        <UserCard key={"card"+idx} user={user} index={idx} onToggleEmail={handleToggleEmail}/>
      ))}
    </div>
  );
}
