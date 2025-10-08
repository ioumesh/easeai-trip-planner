"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader } from "lucide-react";
import EmptyBox from "./EmptyBox";
import GroupSizeUI from "./GroupSizeUi";
import BudgetUI from "./BudgetUI";
import TripDaysUI from "./TripDaysUI";
import FinalUI from "./FinalUI";
import TravelInterestUI from "./TravelInterestUI";
import LocationUI from "./LocationUI";

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
// Track which steps have already been completed to avoid duplicate prompts
const [completedSteps, setCompletedSteps] = useState<{ route?: boolean; budget?: boolean; groupSize?: boolean; tripDuration?: boolean; travelInterest?: boolean }>({});

const stepOrder: Array<keyof typeof completedSteps> = ["route", "groupSize", "budget", "tripDuration", "travelInterest"];

const allCoreStepsCompleted = useMemo(() => {
  return !!(completedSteps.route && completedSteps.groupSize && completedSteps.budget && completedSteps.tripDuration && completedSteps.travelInterest);
}, [completedSteps]);
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
      const suggestedUi: string = String(res?.data?.ui ?? '');
      // If the suggested UI corresponds to a step already completed, suppress it.
      const isCompleted = (step: string) => (step === 'route' && completedSteps.route)
        || (step === 'budget' && completedSteps.budget)
        || (step === 'groupSize' && completedSteps.groupSize)
        || (step === 'tripDuration' && completedSteps.tripDuration)
        || (step === 'travelInterest' && completedSteps.travelInterest);
      const nextNeeded = stepOrder.find((s) => !isCompleted(String(s))) as string | undefined;
      let nextUi = suggestedUi;
      if (suggestedUi === 'final' && !allCoreStepsCompleted) {
        nextUi = nextNeeded ?? '';
      } else if (!suggestedUi || isCompleted(suggestedUi) || (nextNeeded && suggestedUi !== nextNeeded)) {
        // Enforce the strict order
        nextUi = nextNeeded ?? suggestedUi;
      }
      setMessages((prev)=>[...prev, {role: "assistant", content, ui: nextUi}]);

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
    case "route":
      return <LocationUI onConfirm={(from:string, to:string)=>{ setCompletedSteps((p)=>({ ...p, route: true })); setUserInput(`${from} to ${to}`); handleSubmit(); }} />
    case "budget":
      return <BudgetUI handleBudgetClick={(v:string)=>{ setCompletedSteps((p)=>({ ...p, budget: true })); setUserInput(v);handleSubmit() }} />;
    case "groupSize":
      return <GroupSizeUI handleGroupSizeClick={(v:string)=>{ setCompletedSteps((p)=>({ ...p, groupSize: true })); setUserInput(v);handleSubmit() }}/>; 
    case "tripDuration":
      return <TripDaysUI onConfirm={(d:number)=>{ setCompletedSteps((p)=>({ ...p, tripDuration: true })); setUserInput(`${d} Days`);handleSubmit() }} />
    case "travelInterest":
      return <TravelInterestUI onConfirm={(vals:string[])=>{ setCompletedSteps((p)=>({ ...p, travelInterest: true })); setUserInput(vals.join(", "));handleSubmit() }} />
      case "final":
        return allCoreStepsCompleted ? <FinalUI onViewTrip={()=>{ /* integrate navigation later */ }} /> : null
  }
}
  return (
    <div className="flex flex-col h-[85vh] border rounded-2xl shadow-sm bg-card/50">
      {messages.length === 0 && <EmptyBox handleSuggestionClick={(v:string  )=>{ setUserInput(v);handleSubmit()  }} />}
      {/* Messages list (scrollable) */}
      <section className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
        {messages.map((message)=>(
          message.role === "user" ? (
            <div className="flex justify-end" key={message.content}>
            <div className="bg-primary text-primary-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-2xl text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap break-words max-w-[85%] shadow-xs">{message.content}</div>
           </div>
           ):(
           <div className="flex justify-start" key={message.content}>
            <div className="bg-muted text-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-2xl text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap break-words max-w-[85%] shadow-xs">
              <div>{message.content}</div>
              <div className="mt-3">{rendergenerativeUI(message.ui??"")}</div>
            </div>
           </div>
           )
        ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-muted text-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-2xl text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap break-words max-w-[85%] flex items-center gap-2">
            <span>Thinking...</span>
            <Loader className="animate-spin"/>
          </div>
        </div>
      )}
      <div ref={endRef} />
      </section>

      {/* Input (anchored at bottom) */}
      <section
        className="p-3 md:p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80  mb-2"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className={"border rounded-2xl p-3 md:p-4 relative focus-within:ring-2 focus-within:ring-primary/40 bg-card/50"}
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
            className={"absolute right-4 bottom-4 h-10 w-10 md:h-11 md:w-11 rounded-full shadow-md"}
            onClick={handleSubmit}
            aria-label="Send message"
            disabled={loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
