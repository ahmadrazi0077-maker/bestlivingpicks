'use client';

import { useState } from 'react';
import type { TocHeading } from '../lib/toc';

export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [open, setOpen] = useState(true);
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-bold uppercase tracking-wide text-ink">
          In this guide
        </span>
        <span className="text-slate-400">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <ul className="mt-3 space-y-2 border-t border-slate-100 pt-3">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="text-sm leading-snug text-sage-dark hover:text-sage-dark hover:underline"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
