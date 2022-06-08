import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { SWRConfig } from 'swr'
import swrConfig from '../api/API'
import Categories from '../modules/Categories'

function CategoryContainer() {
  return (
    <SWRConfig value={swrConfig}>
      <Categories />
    </SWRConfig>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | SofaSkoro</title>
      </Head>

      <nav>
        <Link href="/">Home</Link>
      </nav>

      <div>
        <h1>Welcome to SofaSkoro</h1>
        <p>Available categories for Football:</p>

        <CategoryContainer />
      </div>
    </>
  )
}

export default Home
