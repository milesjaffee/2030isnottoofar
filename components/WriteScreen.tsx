"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function WriteScreen({ onBack }: { onBack: () => void }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl w-full space-y-8"
    >
      <button onClick={onBack} className="text-neutral-200 hover:text-neutral-0">← Back</button>

      <h2 className="text-4xl font-semibold">Write to 2030 you</h2>
      <p className="">
        Be honest. Be kind. Be bold. You won't remember writing this.
      </p>

      <Textarea
        placeholder="What do you want your future self to remember?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[180px] bg-neutral-900/75 border-neutral-800"
      />

      <Input
        placeholder="Your email (for the future)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-neutral-900/75 border-neutral-800"
      />

      <Button
        size="lg"
        variant="ghost"
        disabled={!message || !email}
        onClick={async () => {
          const res = await fetch('/api/messages', {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, email }),
          });

          if (res.status == 200) {
            console.log(res);
            alert("Your message has been saved for 2030. Check your email (and spam folder) to confirm your email address! (We will obviously never send you anything until, well, 2030).");
            setMessage("");
            setEmail("");
          } else {
            alert("Something went wrong. You've probably already used this email to sign up - in which case, sorry, you only get one message! Try again.");
          }
        }}
      >
        Save my message
      </Button>

      <p className="text-xs">
        Your message is private. We won't read it.
      </p>
    </motion.div>
  );
}