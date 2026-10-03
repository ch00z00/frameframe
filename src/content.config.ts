import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema baseline from .kiro/specs/article-rendering/requirements.md Requirement 1.
// `tone`, `work`, `subtitle` are presentation fields added during implementation of
// the accepted homepage design (docs/artifacts/homepage-concept-a-imax-snap.html):
// `tone` drives the color-graded IMAX frame per article, `work`/`subtitle` let the
// headline render the film title in italics without string-parsing `title`.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.date(),
      updatedDate: z.date().optional(),
      tags: z.array(z.string()).min(1),
      is_premium: z.boolean().default(false),
      draft: z.boolean().default(false),
      tone: z.enum(['cold', 'warm']),
      work: z.string(),
      englishTitle: z.string(),
      subtitle: z.string(),
      director: z.string(),
      production: z.string(),
      cast: z.array(z.string()).min(1),
      // Homepage card art. Optional — articles without one fall back to the
      // existing tone-tinted gradient frame. User-supplied stills only
      // (see project chat: no scraped/IMDb imagery — copyright).
      image: image().optional(),
    }),
});

export const collections = { articles };
