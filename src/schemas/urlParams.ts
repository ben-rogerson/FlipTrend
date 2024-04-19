// import { z } from 'zod'
// import { schemaMediaItemType } from '@/schemas/Bk/mediaItem'

// const schemaUrlParamType = schemaMediaItemType.nullable()

// export type UrlParamType = z.infer<typeof schemaUrlParamType>

export type UrlParams = { countryId?: string; sort?: 'asc' | 'desc' }
