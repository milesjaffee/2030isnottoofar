"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import WriteScreen from "@/components/WriteScreen";
import StatCard from "@/components/StatCard";

export default function Home() {
  const [view, setView] = useState<"home" | "write">("home");

  return (
    <main className="min-h-screen bg-[conic-gradient(#9233ea,#db2777,#2564eb)] text-neutral-100 flex items-center justify-center p-6">
      {view === "home" ? <HomeScreen onWrite={() => setView("write")} /> : <WriteScreen onBack={() => setView("home")} />}
    </main>
  );
}

function HomeScreen({ onWrite }: { onWrite: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-10"
    >
      <h1 className="text-5xl font-semibold tracking-tight">2030 is not too far away!</h1>
      <p className="text-neutral-100 text-lg">
        Thousands of people have written a message to their future selves. Someday, you'll read yours.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Messages Written" value="18,432" />
        <StatCard label="Countries" value="62" />
        <StatCard label="Years Ahead" value="~5" />
      </div>

      <Button size="lg" className="text-lg back" variant="ghost" onClick={onWrite}>
        Send a message to your future self
      </Button>
    </motion.div>
  );
}


