const MEDIA_API = ' https://simplywall.st/api/grid/filter?include=grid,score'

export const api = {
  fetchOMDbMedia: (params: string) => fetch([MEDIA_API, params].join('&')),
  fetchLogo: (companyName: string) =>
    fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`
    ),
}
