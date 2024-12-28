"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const CopyButton = ({ text }: {text: string}) => {

    const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button onClick={copy} className="flex items-center gap-2">
        {copied ? <Check /> : <Copy />}
    </button>
  )
}