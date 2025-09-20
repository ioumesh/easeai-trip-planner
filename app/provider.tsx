/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContex";
const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const createUser = useMutation(api.user.createNewUser);
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    if (user) {
      createNewUser();
    }
  },[user]);
  
  const createNewUser=async()=>{
    if(user){ const res=await createUser({
      name: user?.fullName,
        email: user?.emailAddresses[0].emailAddress,
        imageUrl: user?.imageUrl,
      });
      setUserDetail(res);
    }
  }
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail:setUserDetail }}>
      <Header />
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;
