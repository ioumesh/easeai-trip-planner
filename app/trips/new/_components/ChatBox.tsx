"use client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader } from "lucide-react";
import EmptyBox from "./EmptyBox";
import GroupSizeUI from "./GroupSizeUi";
import BudgetUI from "./BudgetUI";

type ChatMessage = {
  role: string;
  content: string;
  ui?: string;
};

const ChatBox = () => {
  const { user } = useUser();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
  
  ]);
const [userInput ,setUserInput] = useState<string>("");
const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSubmit = async () => {
    if(!userInput.trim()) return;
    setUserInput("");
    const newMessage:ChatMessage = {
      role: "user",
      content: userInput,
    };
    setMessages((prev)=>[...prev, newMessage]);

    setLoading(true);
    try {
      const res=await axios.post("/api/aimodel", { messages:[...messages, newMessage]});
      const content = typeof res?.data?.resp === 'string' ? res.data.resp : 'Sorry, something went wrong.';
      setMessages((prev)=>[...prev, {role: "assistant", content, ui: res.data.ui}]);

      console.log(res.data);
    } catch (err) {
      const fallback = 'Sorry, I had trouble reaching the AI. Please try again.';
      setMessages((prev)=>[...prev, {role: "assistant", content: fallback}]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
const rendergenerativeUI = (ui:string)=>{
  switch(ui){
    case "budget":
      return <BudgetUI />;
    case "groupSize":
      return <GroupSizeUI/>;
  }
}
  return (
    <div className="flex flex-col h-[85vh] border rounded-lg">
      {messages.length === 0 && <EmptyBox handleSuggestionClick={(v:string  )=>{ setUserInput(v);handleSubmit()  }} />};
      {/* Messages list (scrollable) */}
      <section className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2">
        {messages.map((message)=>(
          message.role === "user" ? (
            <div className="flex justify-end" key={message.content}>
            <div className="bg-primary text-primary-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-[15px] leading-normal whitespace-pre-wrap break-words">{message.content}</div>
           </div>
           ):(
           <div className="flex justify-start" key={message.content}>
            <div className="bg-muted text-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-[15px] leading-normal whitespace-pre-wrap break-words">{message.content}
              {rendergenerativeUI(message.ui??"")}
            </div>
           </div>
           )
        ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-muted text-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-[15px] leading-normal whitespace-pre-wrap break-words">Thinking...<Loader className="animate-spin"/></div>
        </div>
      )}
      </section>

      {/* Input (anchored at bottom) */}
      <section
        className="p-3 md:p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80  mb-2"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className={`border rounded-2xl p-3 md:p-4 relative focus-within:ring-2 focus-within:ring-primary/40  "ring-2 ring-destructive/40" : ""
          }`}
        >
          <Textarea
            ref={textareaRef}
            placeholder={`${user?.firstName ?? "me"} start planning your trip...`}
            className="w-full min-h-[72px] md:min-h-[100px] bg-transparent border-none focus-visible:ring-0 shadow-none resize-none pr-12"
            value={userInput}
            onChange={(event)=>setUserInput(event.target.value)}
          />
          <Button
            size={"icon"}
            className={`absolute right-4 bottom-4 h-10 w-10 md:h-11 md:w-11 rounded-full shadow-md $
            }`}
            onClick={handleSubmit}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
