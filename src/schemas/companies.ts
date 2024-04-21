import { z } from 'zod'

/**
 * Company schema
 * Items commented out are not used in the current project and are stripped
 * when the data is parsed.
 */
const companySchema = z.object({
  id: z.number(),
  // company_id: z.string(),
  // trading_item_id: z.number(),
  name: z.string(),
  slug: z.string(),
  // exchange_symbol: z.string(),
  // ticker_symbol: z.coerce.string(),
  unique_symbol: z.string(),
  // primary_ticker: z.boolean(),
  // last_updated: z.number(),
  // canonical_url: z.string(),
  primary_canonical_url: z.string(),
  // is_searchable: z.boolean(),
  // isin_symbol: z.string(),
  score: z.object({
    data: z.object({
      value: z.number(),
      income: z.number(),
      health: z.number(),
      past: z.number(),
      future: z.number(),
      // management: z.number(),
      // misc: z.number(),
      total: z.number(),
      // sentence: z.string(),
    }),
  }),
  grid: z.object({
    data: z.object({
      // year_founded: z.number(),
      // description: z.string(),
      // logo_url: z.string(),
      // share_price: z.number(),
      market_cap: z.number(),
      // pe: z.number(),
      // pb: z.number(),
      // price_to_sales: z.number(),
      // analyst_count: z.number(),
      // return_1d: z.number(),
      // return_7d: z.number(),
      // return_1yr_abs: z.number(),
      // price_target: z.number(),
      // growth_3y: z.number().nullable(),
      // net_income_growth_annual: z.number().nullable(),
      // revenue_growth_annual: z.number(),
      // dividend_yield: z.number().nullable(),
      // primary_industry: z.object({ id: z.number(), name: z.string() }),
      currency_info: z.object({
        // reporting_unit_abs: z.number(),
        // reporting_currency_iso: z.string(),
        // trading_item_currency_iso: z.string(),
        // reporting_unit_text: z.string(),
        // reporting_unit_text_abs: z.string(),
        // primary_trading_item_currency_symbol: z.string(),
        reporting_currency_symbol: z.string(),
        // reporting_unit: z.number(),
        // trading_item_currency_symbol: z.string(),
        // primary_trading_item_currency_iso: z.string(),
      }),
      // main_thumb: z.string(),
      // main_header: z.string(),
    }),
  }),
})

export const companiesResponseSchema = z.object({
  data: z.array(companySchema),
  meta: z.object({
    // total_records: z.number(),
    real_total_records: z.number(),
    // state: z.string(),
    // noResultIfLimit: z.boolean(),
    // pe: z.number().nullable(),
    // return_1yr_abs: z.number(),
    // return_7d: z.number(),
  }),
})

export type Company = z.infer<typeof companySchema>
export type CompaniesResponse = z.infer<typeof companiesResponseSchema>
