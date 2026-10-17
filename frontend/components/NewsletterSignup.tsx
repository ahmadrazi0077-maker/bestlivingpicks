'use client';

import { useState } from 'react';
import { api } from '../lib/api';

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await api.subscribe(email);
      setStatus('done');
      setMessage(res.message ?? 'Thanks for subscribing!');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className={`rounded-2xl bg-night-900 p-6 text-white ${compact ? '' : 'md:p-8'}`}>
      <h3 className="text-xl font-bold">Sleep better, starting tonight</h3>
      <p className="mt-1 text-sm text-slate-300">
        One short email a week: new reviews, price drops, and buying guides. No spam, unsubscribe anytime.
      </p>
      {status === 'done' ? (
        <p className="mt-4 rounded-xl bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-emerald-300">{message}</p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-slate-400 focus:border-amber-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-xl bg-amber-400 px-5 py-2.5 font-bold text-night-950 transition hover:bg-amber-300 disabled:opacity-60"
          >
            {status === 'loading' ? 'Joining…' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="mt-2 text-sm text-rose-300">{message}</p>}
    </div>
  );
}
