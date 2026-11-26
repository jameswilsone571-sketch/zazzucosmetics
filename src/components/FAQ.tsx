"use client";

import { Plus } from "./Icons";

export type FaqItem = { question: string; answer: string };

export function FAQ({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={`divide-y divide-cocoa/10 border-y border-cocoa/10 ${className}`}>
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-medium sm:text-base">
            {item.question}
            <span className="plus-icon shrink-0 text-gold"><Plus className="h-5 w-5" /></span>
          </summary>
          <p className="body-copy mt-3 max-w-2xl pr-8 text-sm">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
