import { SORT_OPTIONS } from '@/constants'
import { z } from 'zod'

export const filterSchema = z.object({
  countryId: z.string().optional(),
  sort: z.enum(SORT_OPTIONS).optional(),
})

export type Filters = z.infer<typeof filterSchema>
