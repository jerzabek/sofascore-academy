
import { Fetcher, SWRConfiguration } from 'swr'

const fetcher: Fetcher<string, string> = (args) => fetch(args).then(res => res.json())

export const swrConfig: SWRConfiguration = { fetcher };

export const OPENTDB_URL = 'https://opentdb.com/api.php?amount=15&encode=url3986';