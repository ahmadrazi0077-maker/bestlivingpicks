import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="text-7xl font-black text-slate-900">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">This page slipped off the bed</h1>
      <p className="mt-3 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s get you back to
        something more comfortable.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-indigo-600 px-6 py-3 font-bold text-slate-900 transition hover:bg-indigo-700"
        >
          Back home
        </Link>
        <Link
          href="/articles"
          className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:border-slate-900"
        >
          Browse articles
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:border-slate-900"
        >
          Top picks
        </Link>
      </div>
    </div>
  );
}
