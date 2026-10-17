import { Router } from 'express';
import { supabase } from '../lib/supabase';
import { asyncHandler, isValidEmail } from '../lib/utils';

const router = Router();

/**
 * POST /api/subscribers { email }
 * Validates the email and dedupes on the unique constraint.
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email } = req.body ?? {};

    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'A valid email address is required.' });
      return;
    }

    const normalized = email.trim().toLowerCase();

    const { error } = await supabase
      .from('subscribers')
      .insert({ email: normalized });

    if (error) {
      // 23505 = unique violation → already subscribed. Treat as success (idempotent).
      if (error.code === '23505') {
        res.status(200).json({ ok: true, message: 'Already subscribed.' });
        return;
      }
      throw error;
    }

    res.status(201).json({ ok: true, message: 'Subscribed successfully.' });
  })
);

export default router;
