import { z } from 'zod';

export const MediaSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  type: z.enum(['Anime', 'Manga', 'Game', 'Music']),
  score: z.number().min(0).max(10).optional(),
  progress: z.string().optional(),
  status: z.enum(['Reading', 'Watching', 'Completed', 'Plan to Watch', 'Paused', 'Dropped']),
  coverImage: z.string().url().optional(),
  updatedAt: z.string().optional(),
});

export const APIResponseSchema = z.object({
  data: z.array(MediaSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    lastPage: z.number(),
  }).optional(),
});
