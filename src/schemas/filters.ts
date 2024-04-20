import { z } from 'zod'

export const filterSchema = z.object({
  countryId: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
})

export type Filters = z.infer<typeof filterSchema>
