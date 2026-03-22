"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import WriteScreen from "@/components/WriteScreen";
import StatCard from "@/components/StatCard";

export default function Home() {
  const [view, setView] = useState<"home" | "write">("home");

  return (
    
      <div>{view === "home" ? <HomeScreen onWrite={() => setView("write")} /> : <WriteScreen onBack={() => setView("home")} />}</div>
  );
}

function HomeScreen({ onWrite }: { onWrite: () => void }) {

  const targetDate = new Date("Jan 1, 2030 00:00:00").getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365))
  const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365))/ (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timeleft = years+ " years, "+days+" days, "+hours+" hours, "+minutes+" minutes, and "+seconds+" seconds"



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
        <StatCard label="Messages Written" value={ "18,434"} />
        <StatCard label="in the future" value={timeleft} />
      </div>

      <Button size="lg" className="text-lg back" variant="ghost" onClick={onWrite}>
        Send a message to your future self
      </Button>
    </motion.div>
  );
}


