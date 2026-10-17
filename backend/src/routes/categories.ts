import { Router } from 'express';
import { supabase } from '../lib/supabase';
import { asyncHandler } from '../lib/utils';

const router = Router();

/** GET /api/categories — all categories. */
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, description')
      .order('name', { ascending: true });
    if (error) throw error;
    res.json({ categories: data });
  })
);

/** GET /api/categories/:slug — category with its published articles. */
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { data: category, error } = await supabase
      .from('categories')
      .select('id, name, slug, description')
      .eq('slug', req.params.slug)
      .single();

    if (error || !category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const { data: articles, error: artErr } = await supabase
      .from('articles')
      .select('id, title, slug, excerpt, cover_image_url, published_at, reading_time_min, featured')
      .eq('status', 'published')
      .eq('category_id', category.id)
      .order('published_at', { ascending: false });

    if (artErr) throw artErr;
    res.json({ category: { ...category, articles: articles ?? [] } });
  })
);

export default router;
