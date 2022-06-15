import styled from "styled-components";

export const TournamentName = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
`

export const VerticalBorder = styled.div`
  height: 2rem;
  border-left: 1px solid #00000025;
  margin: 0 10px;
`

export const TournamentEvent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 0 0 6px;
  padding: 4px 8px;

  &:hover {
    background-color: #00000010;
  }
`

export const TournamentEventStatus = styled.div`
  min-width: 60px;
  text-align: end;
`

export const TournamentEventBody = styled.div`
  flex: 1;
`