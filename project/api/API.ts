import { Fetcher, SWRConfiguration } from "swr"

// TODO: prebaci se na axios, defaultno baca error na 400 i 500
export const swrFetcher = (args: string) => fetch(args).then(response => {
  if (response.status >= 400 && response.status < 600) {
    return response.json().then(json => { throw json })
  }

  return response.json()
})

const swrConfig: SWRConfiguration = { fetcher: swrFetcher }

export default swrConfig;
