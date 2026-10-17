import { Router } from 'express';
import { supabase } from '../lib/supabase';
import { asyncHandler, parseLimit } from '../lib/utils';

const router = Router();

/**
 * GET /api/articles?category=slug&featured=true&limit=20
 * Published articles, newest first.
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const limit = parseLimit(req.query.limit);
    const categorySlug = typeof req.query.category === 'string' ? req.query.category : undefined;
    const featuredOnly = req.query.featured === 'true';

    let query = supabase
      .from('articles')
      .select('id, title, slug, excerpt, cover_image_url, published_at, reading_time_min, featured, category:categories(id, name, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (featuredOnly) query = query.eq('featured', true);

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
    res.json({ articles: data });
  })
);

/**
 * GET /api/articles/:slug
 * Full article with its category and linked products (ordered).
 */
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { data: article, error } = await supabase
      .from('articles')
      .select('*, category:categories(id, name, slug, description)')
      .eq('slug', req.params.slug)
      .eq('status', 'published')
      .single();

    if (error || !article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    const { data: links, error: linkErr } = await supabase
      .from('article_products')
      .select('position, product:products(*)')
      .eq('article_id', article.id)
      .order('position', { ascending: true });

    if (linkErr) throw linkErr;

    res.json({
      article: {
        ...article,
        products: (links ?? []).map((l) => l.product),
      },
    });
  })
);

export default router;
