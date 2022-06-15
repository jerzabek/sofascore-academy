import type { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '../components/Common'
import Categories from '../modules/category/Categories'
import Footer from '../modules/common/Footer'
import NavBar from '../modules/common/NavBar'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | SofaSkoro</title>
      </Head>

      <NavBar />

      <Container>
        <h1>Welcome to SofaSkoro</h1>
        <h3><i>Visit SofaSkoro for the most exciting and up-to-date sports statistics</i></h3>

        <Categories />
      </Container>

      <Footer />
    </>
  )
}

export default Home
