import styled from 'styled-components'

export const CategoryListItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
`

export const CategoryList = styled.div`
  color: black;

  ${CategoryListItem}:nth-child(even) {
    background-color: #00000008;
  }
  
  & ${CategoryListItem}:hover {
    background-color: #00000015;
  }
`

export const CategoryEventPreviewTournament = styled.div`
  opacity: 0.6;
  font-size: 0.9em;
`

export const CategoryEventPreviewElement = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #00000025;

  &:hover {
    background-color: #00000010;
  }
`

export const CategoryEventsContainer = styled.div`
  margin: 0 15px;
  padding: 0 5px;
  border-left: 1px solid #00000044;

  max-height: 0;
  transition: max-height 1s cubic-bezier(0, 1, 0, 1);
  overflow: hidden;

  &.show {
    max-height: 5000px;
    transition: max-height 1.5s ease-in-out;
  }
`

export const CategoryTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`

export const CategorySubtitle = styled.span`
  font-size: 0.9rem;
  color: #00000060;
`

export const LiveIndicator = styled.span`
  font-weight: bold;
  color: red;
`