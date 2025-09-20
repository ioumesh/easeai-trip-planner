"use client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const ChatBox = () => {
  const { user } = useUser();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [showError, setShowError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help plan your trip. Tell me where, when, and for how long.",
    },
  ]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSubmit = () => {
    if (!user) {
      return router.push("/sign-in");
    }
    if (!prompt.trim()) {
      setShowError(true);
      toast.error("Tell me about your trip to get started");
      textareaRef.current?.focus();
      setTimeout(() => setShowError(false), 1200);
      return;
    }

    const userText = prompt.trim();
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setPrompt("");

    // Placeholder assistant reply; integrate your AI/backend here
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Got it! I\'m drafting your itinerary...",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[85vh] border rounded-lg">
      {/* Messages list (scrollable) */}
      <section className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2">
       <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-[15px] leading-normal whitespace-pre-wrap break-words">user message</div>
       </div>
       <div className="flex justify-start">
        <div className="bg-muted text-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-[15px] leading-normal whitespace-pre-wrap break-words">assistant message</div>
       </div>
      </section>

      {/* Input (anchored at bottom) */}
      <section
        className="p-3 md:p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80  mb-2"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className={`border rounded-2xl p-3 md:p-4 relative focus-within:ring-2 focus-within:ring-primary/40 ${
            showError ? "ring-2 ring-destructive/40" : ""
          }`}
        >
          <Textarea
            ref={textareaRef}
            placeholder={`Create a trip for ${user?.firstName ?? "me"} to Goa...`}
            className="w-full min-h-[72px] md:min-h-[100px] bg-transparent border-none focus-visible:ring-0 shadow-none resize-none pr-12"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            aria-invalid={showError || undefined}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            size={"icon"}
            className={`absolute right-4 bottom-4 h-10 w-10 md:h-11 md:w-11 rounded-full shadow-md ${
              showError ? "animate-bounce" : ""
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
