/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContex";
import type { Doc, Id } from "@/convex/_generated/dataModel";
const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const createUser = useMutation(api.user.createNewUser);
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<Id<"userTable"> | Doc<"userTable"> | null>(
    null
  );
  useEffect(() => {
    if (user) {
      createNewUser();
    }
  },[user]);
  
  const createNewUser = async () => {
    if (user) {
      const safeEmail: string = user?.emailAddresses?.[0]?.emailAddress ?? "";
      const safeImageUrl: string = user?.imageUrl ?? "";
      const fallbackFromEmail: string = safeEmail
        ? safeEmail.split("@")[0]
        : "Unknown";
      const safeName: string =
        user?.fullName ?? user?.firstName ?? user?.username ?? fallbackFromEmail;

      const res = await createUser({
        name: safeName,
        email: safeEmail,
        imageUrl: safeImageUrl,
      });
      setUserDetail(res);
    }
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail:setUserDetail }}>
      <Header />
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;
