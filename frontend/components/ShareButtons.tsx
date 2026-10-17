'use client';

import { useState } from 'react';

export default function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);

  const share = (network: 'x' | 'facebook') => {
    const url = encodeURIComponent(`https://www.bestlivingpicks.com${path}`);
    const text = encodeURIComponent(title);
    const href =
      network === 'x'
        ? `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        : `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(href, '_blank', 'noopener,width=600,height=500');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://www.bestlivingpicks.com${path}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const btn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-900 hover:text-slate-900';

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-slate-500">Share</span>
      <button type="button" onClick={() => share('x')} className={btn} aria-label="Share on X">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => share('facebook')}
        className={btn}
        aria-label="Share on Facebook"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
        aria-label="Copy link"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
