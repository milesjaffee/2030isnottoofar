'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import { redirect } from "next/navigation";

export default function Verified() {

    //const id = useSearchParams().get("id") || "many";
    return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-10"
    >
      <h1 className="text-5xl font-semibold tracking-tight">Issue verifying message!</h1>
      <p className="text-neutral-100 text-lg">
        If you've clicked this link multiple times, your message has already been verified and will be sent to your future self when the time comes.
      </p>
      <p className="text-neutral-100 text-lg">
        If this is the first time you've seen this, or if you got this from somewhere other than an email from us, contact support at mej327@lehigh.edu.
      </p>

      <Button size="lg" className="text-lg back" variant="ghost" onClick={() => {redirect('/')}}
      >
        Go to homepage
      </Button>

    </motion.div>
    )   
}
