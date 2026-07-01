"use client";

import dynamic from "next/dynamic";

const NextGenAI = dynamic(() => import("./NextGenAI"), { ssr: false });

export default NextGenAI;
