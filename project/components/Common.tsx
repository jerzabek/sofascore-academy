import styled from "styled-components"

// Colors
export const PRIMARY = "#f4d35e"
export const SECONDARY = "#233d4d"

// Resolution breakpoints
export const ResponsiveResolutions = {
  md: '(max-width: 900px)',
  lg: '(max-width: 1200px)'
}

// Common components
export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;

  @media ${ResponsiveResolutions.lg} {
    padding-left: 10px;
    padding-right: 10px;
    
    max-width: 900px;
  }

  @media ${ResponsiveResolutions.md} {
    max-width: 100%;
  }
`

export const FlexContainer = styled.div`
  display: flex;
`

export const FlexSpaceBetweenContainer = styled(FlexContainer)`
  justify-content: space-between;
  align-items: center;
`

export const NavBarElement = styled.nav`
  background-color: ${SECONDARY};
  color: #fff;

  margin-bottom: 20px;
  padding: 30px 0;

  width: 100%;
  font-size: 1.2rem;
  
  & a {
    color: #fff;
    text-decoration: none;
  }
`

export const FooterElement = styled.footer`
  margin-top: 50px;
  min-height: 50px;
  background-color: ${PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
`