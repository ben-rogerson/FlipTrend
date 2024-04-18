const SWS_API_URL = 'https://simplywall.st/api/grid/filter?include=grid,score'

export const api = {
  fetchCompanies: (params: string) => fetch([SWS_API_URL, params].join('&')),
}
