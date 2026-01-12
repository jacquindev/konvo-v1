"use client";

import { ArrowRightIcon, BinocularsIcon } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

export function HeroSection() {
  return (
    <section className="mx-auto flex h-dvh w-full max-w-6xl flex-col items-center justify-center px-6 py-32">
      <div className="mb-6 inline-flex animate-in items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
        <span className="text-xs font-light tracking-wide text-zinc-300">
          Version 1.0.0 available now
        </span>
      </div>

      <h1 className="mb-6 text-center text-4xl leading-[1.2] font-semibold tracking-tight text-balance text-white md:text-6xl">
        <span className="transform bg-linear-to-r from-[#8b6ee9] via-[#4f9fe6] to-[#8b6ee9] bg-clip-text text-9xl font-bold text-transparent lg:text-[180px] xl:text-[220px]">
          Konvo.
        </span>
        <br />
        <span className="text-zinc-200">
          Human-friendly support,
          <br />
          <span className="bg-linear-to-b from-zinc-200 via-zinc-400 to-zinc-700 bg-clip-text text-transparent">
            powered by AI.
          </span>
        </span>
      </h1>

      <p className="mx-auto mb-8 max-w-xl text-center text-base leading-snug text-balance text-zinc-400 lg:max-w-2xl">
        Instantly resolve customer questions with an assistant that reads you
        docs and speaks with empathy. No robotic replies, just answers.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          type="button"
          variant="secondary"
          className="h-11 rounded-full px-8!"
        >
          View Demo <BinocularsIcon />
        </Button>
        <Button
          type="button"
          className="group h-11 cursor-pointer rounded-full px-8!"
        >
          Start for Free
          <ArrowRightIcon className="size-4 shrink-0 transition group-hover:translate-x-0.5" />
        </Button>
      </div>
    </section>
  );
}
