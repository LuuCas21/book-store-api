import { z } from 'zod';
export const BookStoreSchema = z.object({
    name: z.string(),
    price: z.string(),
    author: z.string(),
    image: z.string(),
    description: z.string(),
});
