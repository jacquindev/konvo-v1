"use client";

import { Variants, motion } from "motion/react";

import { ChatbotPanel } from "./chatbot-panel";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const showCaseItems = [
  {
    title: "Conversational Onboarding",
    description:
      "Guide new users through setup and features with a personalized chatbot experience.",
  },
  {
    title: "Smart Support Routing",
    description: "Automatically resolve common questions or escalate to a human when needed.",
  },
  {
    title: "CRM & Email Integration",
    description: "Connect seamlessly with your existing tools to sync contacts and run campaigns.",
  },
];

export function ShowCase() {
  return (
    <section className="px-6 py-12 lg:px-16">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-8 overflow-hidden rounded-2xl border-2 border-white/5 bg-[#05050e]/60 shadow-lg backdrop-blur-xl lg:grid-cols-2">
        {/* Gradient Background */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-indigo-500/30 from-5% via-[#05050e]/30 via-30% to-indigo-500/50" />

        <div className="space-y-6 p-10">
          <h2 className="text-4xl font-semibold text-white">
            Experience conversational support that converts
          </h2>
          <p className="text-base text-balance text-zinc-300">
            Meet your AI assistant. Automate onboarding, assist customers in real-time, and grow
            your business — all through a customizable chat experience.
          </p>
          {showCaseItems.map((feature, index) => (
            <motion.li key={index} variants={itemVariants} className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <div>
                <h3 className="text-base font-medium text-white">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.description}</p>
              </div>
            </motion.li>
          ))}
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="mx-auto w-full max-w-3xl">
            <ChatbotPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
