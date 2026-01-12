import React from "react";

import { AnimatedUnicorn } from "@/modules/landing/animated-unicorn";
import { Navbar } from "@/modules/landing/navbar";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#010102] font-sans text-zinc-200 selection:text-zinc-800 antialiased">
      <div className="absolute inset-0 z-0">
        <AnimatedUnicorn />
        <div className="absolute inset-0 bg-linear-to-t from-[#010102] via-transparent to-transparent opacity-80" />
      </div>
      <main className="z-20 flex h-screen w-full flex-1 flex-col overflow-y-auto">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
