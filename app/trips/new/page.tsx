"use client";
import React from "react";
import ChatBox from "./_components/ChatBox";

export default function NewTripPage() {
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 p-4">
    <div><ChatBox /></div>
    <div>trip details map</div>
  </div>
  );
}


