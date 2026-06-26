'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import StatCard from "./StatCard";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import TickingClock from "@/components/ui/ticking_clock";

export function HomeScreen() {

  const [countData, setCountData] = useState(0);

  async function getNumResponses() {
  let response = await fetch('/api/stats', {
        method: 'GET',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },        
      });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Execution pauses here until the body is parsed as JSON
    const count = await response.json();

    //console.log(count.count.id);
    setCountData(count.count.id);

    /*const outputElement = document.getElementById('msgcount_output');
  if (outputElement) {
    outputElement.textContent = JSON.stringify(count, null, 2);
  }*/

}

  useEffect(() => {
    getNumResponses();
  }, [])

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
        <StatCard label="Messages Written" value={countData.toLocaleString() ?? "0"} />
        <StatCard label="in the future" value={TickingClock()} />
      </div>

      <Button size="lg" className="text-lg back" variant="ghost" onClick={() => {redirect('/write')}}>
        Send a message to your future self
      </Button>

      <p className="text-neutral-100 text-lg">
        Created by <a href="https://www.milesj.org" className="opacity-85 hover:opacity-78">Miles Jaffee</a>
      </p>
    </motion.div>
  );
}