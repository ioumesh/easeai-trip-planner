/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const createUser = useMutation(api.user.createNewUser);
  const { user } = useUser();
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
      return res;
    }
  }
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Provider;
