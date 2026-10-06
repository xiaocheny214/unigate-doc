import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default('Guide'),
    order: z.number().default(99),
    updatedAt: z.date().optional()
  })
});

export const collections = { docs };
