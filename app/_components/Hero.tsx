import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Globe, Globe2, Landmark, Plane, Send } from "lucide-react";
const Suggestion = [
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
  return (
    <div className="mt-24 w-full flex  justify-center">
      {/* Content */}
      <div className=" max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I&apos;m your personal
          <span className="text-primary"> Trip Planner</span>
        </h1>
        <p className="text-lg">
          Tell me what you want, and I&apos;ll handle the rest: Flights, Hotels,
          trip Planner - all in seconds
        </p>

        {/* Input Box */}
        <div>
          <div className="border rounded-2xl p-4 relative">
            <Textarea
              placeholder="Create a trip for Delhi to Goa...."
              className="w-full h-40  bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            />
            <Button size={"icon"} className="absolute right-6 bottom-6">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Suggestion */}
      </div>
    </div>
  );
};

export default Hero;
