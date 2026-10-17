import { Router } from 'express';
import { supabase } from '../lib/supabase';
import { asyncHandler, parseLimit } from '../lib/utils';

const router = Router();

/** GET /api/products?category=slug&limit=20 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const limit = parseLimit(req.query.limit);
    const categorySlug = typeof req.query.category === 'string' ? req.query.category : undefined;

    let query = supabase
      .from('products')
      .select('*, category:categories(id, name, slug)')
      .order('rating', { ascending: false })
      .limit(limit);

    if (categorySlug) {
      const { data: category, error: catErr } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      if (catErr || !category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
      query = query.eq('category_id', category.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ products: data });
  })
);

/** GET /api/products/:slug */
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(id, name, slug)')
      .eq('slug', req.params.slug)
      .single();

    if (error || !data) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ product: data });
  })
);

export default router;
