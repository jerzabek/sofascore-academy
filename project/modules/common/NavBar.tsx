import { NextPage } from "next"
import Link from "next/link"
import { Container, NavBarElement } from "../../components/Common"

const NavBar: NextPage = () => {
  return (
    <NavBarElement>
      <Container>
        <Link href="/">Home</Link>
      </Container>
    </NavBarElement>
  )
}

export default NavBar