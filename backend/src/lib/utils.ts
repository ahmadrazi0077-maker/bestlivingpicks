import { Request, Response, NextFunction } from 'express';

/** Wrap async route handlers so rejections reach the error middleware. */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

/** Parse a positive-int query param with a fallback. */
export function parseLimit(value: unknown, fallback = 20, max = 100): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : NaN;
  if (Number.isNaN(n) || n <= 0) return fallback;
  return Math.min(n, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && EMAIL_RE.test(value.trim()) && value.trim().length <= 254;
}
