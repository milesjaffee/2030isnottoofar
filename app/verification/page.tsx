'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const copyText = ( id: string ) => {

  const textToCopy = `I just sent a message to myself in 2030. Send your own: https://2030.milesj.org/?shareImage=${id}`;

  const copyToClipboard = async () => {
    try {
      const textBlob = new Blob([textToCopy], { type: 'text/plain' });
      const textClipboardItem = new ClipboardItem({
        'text/plain': textBlob,
      });

      await navigator.clipboard.write([textClipboardItem]);
    } catch (err: any) {
      console.error('Failed to copy: ', err.name, err.message);
    }
  };
  copyToClipboard();
}

function Page() {
        const id = useSearchParams().get("id") || "0";
        return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-10"
        >
            <meta property="og:image" content={`/api/share-image?id=${id}`} />
        <h1 className="text-5xl font-semibold tracking-tight">Verified message!</h1>
        <p className="text-neutral-100 text-lg">
            You are the latest of {id} to verify your message.
        </p>
        <p className="text-neutral-100 text-lg">
            If you'd like, share this with somebody you'll still know in 2030!
        </p>

        <img src={`/api/share-image?id=${id}`} width={"300px"} onClick={() => {redirect(`/api/share-image?id=${id}`)}}/>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <Button size="lg" className="text-lg back" variant="ghost" onClick={() => {copyText(id)}}
            >
        Copy share message to text
      </Button>
      <Button size="lg" className="text-lg back" variant="ghost" onClick={() => {redirect('/')}}
      >
        Go to homepage
      </Button>
        </div>

        </motion.div>
    }

export default function Verified() {
    
    return (
    <Suspense>
        <Page />
    </Suspense>
    )   
}

