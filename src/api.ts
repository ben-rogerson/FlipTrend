import { type CountryItem } from '@/data/countries'
import { type Filters } from '@/schemas/filters'

const SWS_API_URL = 'https://simplywall.st/api/grid/filter?include=grid,score'

export const api = {
  fetchCompanies: (
    offset: number,
    size: number,
    sort: Filters['sort'],
    country: CountryItem['value']
  ) =>
    fetch(SWS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        accept: 'application/json',
        sws: 'fe-challenge',
      },
      body: JSON.stringify({
        id: 1,
        no_result_if_limit: false,
        offset: offset,
        size: size,
        state: 'read',
        rules: [
          country === 'all'
            ? null
            : ['aor', [['country_name', 'in', [country]]]],
          ['order_by', 'market_cap', sort],
          ['market_cap', 'is_not_null'],
          ['grid_visible_flag', '=', true],
          ['primary_flag', '=', true],
          ['is_fund', '=', false],
        ].filter(Boolean),
      }),
    }),
}
