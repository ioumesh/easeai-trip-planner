"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselContextType = {
  api: ReturnType<typeof useEmblaCarousel>[1] | null;
};

const CarouselContext = React.createContext<CarouselContextType>({ api: null });

export function Carousel({
  className,
  children,
  opts,
}: {
  className?: string;
  children: React.ReactNode;
  opts?: EmblaOptionsType;
}) {
  const [viewportRef, api] = useEmblaCarousel({ align: "start", ...opts });

  return (
    <CarouselContext.Provider value={{ api }}>
      <div className={cn("relative", className)}>
        <div className="overflow-hidden" ref={viewportRef}>
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex -ml-4", className)}>{children}</div>
  );
}

export function CarouselItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0 shrink-0 grow-0 pl-4", className)}>{children}</div>
  );
}

function BaseButton({
  onClick,
  className,
  children,
  disabled,
}: {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "absolute top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 ring-border backdrop-blur hover:shadow-md disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CarouselPrevious({ className }: { className?: string }) {
  const { api } = React.useContext(CarouselContext);
  const [disabled, setDisabled] = React.useState(true);
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setDisabled(!api.canScrollPrev());
    api.on("select", onSelect);
    onSelect();
    return () => api.off("select", onSelect);
  }, [api]);
  return (
    <BaseButton
      className={cn("left-2", className)}
      onClick={() => api?.scrollPrev()}
      disabled={disabled}
    >
      <ChevronLeft className="h-5 w-5 text-gray-700" />
    </BaseButton>
  );
}

export function CarouselNext({ className }: { className?: string }) {
  const { api } = React.useContext(CarouselContext);
  const [disabled, setDisabled] = React.useState(true);
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setDisabled(!api.canScrollNext());
    api.on("select", onSelect);
    onSelect();
    return () => api.off("select", onSelect);
  }, [api]);
  return (
    <BaseButton
      className={cn("right-2", className)}
      onClick={() => api?.scrollNext()}
      disabled={disabled}
    >
      <ChevronRight className="h-5 w-5 text-gray-700" />
    </BaseButton>
  );
}

export default Carousel;


