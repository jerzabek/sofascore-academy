import { Fetcher, SWRConfiguration } from "swr"


const swrFetcher: Fetcher<string, string> = (args) => fetch(args).then(response => response.json())

const swrConfig:SWRConfiguration = { fetcher: swrFetcher }

export default swrConfig;

export function getFootballCategories() {

}