"use client";
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowDown, Globe, Globe2, Landmark, Plane, Send } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const suggestions = [
  {
    title: "Create New Trip",
    icon: <Globe className="h-5 w-5 text-blue-400" />,
  },
  {
    title: "Inspire me where to go",
    icon: <Plane className="h-5 w-5 text-green-400" />,
  },
  {
    title: "Discover Hidden gems",
    icon: <Landmark className="h-5 w-5 text-orange-400" />,
  },
  {
    title: "Adventure Destination",
    icon: <Globe2 className="h-5 w-5 text-yellow-400" />,
  },
];
const Hero = () => {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [showError, setShowError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const handleSubmit = () => {
    if (!user) {
      return router.push("/sign-in");
    }
    if (!prompt.trim()) {
      setShowError(true);
      toast("Tell me about your trip to get started", {
        icon: "✈️",
      });
      textareaRef.current?.focus();
      // remove error highlight after a short delay
      setTimeout(() => setShowError(false), 1200);
      return;
    }
    // navigate to the trip page
    router.push("/trips/new");
  };
  return (
    <div className="mt-12 md:mt-24 w-full flex justify-center px-4 sm:px-6">
      {/* Content */}
      <div className="max-w-3xl w-full text-center space-y-5 sm:space-y-6 md:space-y-8">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
          Hey, I&apos;m your personal
          <span className="text-primary"> Trip Planner</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
          Tell me what you want, and I&apos;ll handle the rest: Flights, Hotels,
          trip Planner - all in seconds
        </p>

        {/* Input Box */}
        <div>
          <div className={`border rounded-2xl p-4 sm:p-5 md:p-6 relative focus-within:ring-2 focus-within:ring-primary/40 ${showError ? "ring-2 ring-destructive/40" : ""}`}>
            <Textarea
              ref={textareaRef}
              placeholder={`Create a trip for ${user?.firstName ?? "me"} to Goa...`}
              className="w-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px] bg-transparent border-none focus-visible:ring-0 shadow-none resize-none pr-12"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              aria-invalid={showError || undefined}
            />
            <Button size={"icon"} className={`absolute right-5 bottom-5 h-10 w-10 sm:h-11 sm:w-11 rounded-full shadow-md ${showError ? "animate-bounce" : ""}`} onClick={handleSubmit}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Suggestion */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
          {suggestions.map((item, index) => (
            <div
              key={`suggestion${index}`}
              className="flex items-center border rounded-full px-3.5 py-2 gap-2 cursor-pointer hover:bg-primary hover:text-white transition-colors select-none text-xs sm:text-sm"
            >
              {item.icon}
              <h2 className="">{item.title}</h2>
            </div>
          ))}
        </div>
         {/* video section */}
        <div>
        <h2 className="mt-10 md:mt-16 mb-4 md:mb-6 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">Not sure how to plan your trip?<strong className="text-primary">Watch this video </strong><ArrowDown className="h-4 w-4 md:h-5 md:w-5" /></h2>
        <div className="relative rounded-xl overflow-hidden border shadow-sm">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
      </div>
      </div>
     
      
    </div>
  );
};

export default Hero;
