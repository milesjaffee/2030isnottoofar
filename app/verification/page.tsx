'use client';

import StatCard from "@/components/StatCard";
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Page() {
        const id = useSearchParams().get("id") || "many";
        return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-10"
        >
        <h1 className="text-5xl font-semibold tracking-tight">Verified message!</h1>
        <p className="text-neutral-100 text-lg">
            You are the latest of {id} to verify your message.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard label="Share 2030 Over Text" value="Share" />
            <StatCard label="Get a Shareable Image" value="Get Image" />
            <StatCard label="Return Home" value="Home" />
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

