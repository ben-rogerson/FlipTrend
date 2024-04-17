import { z } from 'zod'
import { schemaYear } from '@/schemas/Bk/misc'
import { schemaMediaItemType } from '@/schemas/Bk/mediaItem'

const schemaUrlParamYearTuple = z.tuple([schemaYear, schemaYear])

export type UrlParamYearTuple = z.infer<typeof schemaUrlParamYearTuple>

const schemaUrlParamType = schemaMediaItemType.nullable()

export type UrlParamType = z.infer<typeof schemaUrlParamType>
