import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { swrFetcher } from "../../api/API";
import { API_BASE_URL } from "../../api/Constants";
import { LiveIndicator } from "../../components/Category";
import { Container } from "../../components/Common";
import { EventElement, EventTournament } from "../../components/Event";
import { Error } from "../../model/Error";
import { EventInfo } from "../../model/Event";
import NavBar from "../../modules/common/NavBar";

interface EventPageProps {
  event?: EventInfo
  error?: Error
}

const Subtitle = styled.span`
  opacity: 0.8;
`

const EventPage: NextPage<EventPageProps> = ({ event, error }) => {
  const [score, setScore] = useState(`${event?.homeScore.display}:${event?.awayScore.display}`)

  useEffect(() => {
    if (!event) {
      return
    }

    if (!("display" in event.homeScore) || !("display" in event.awayScore)) {
      return
    }

    setScore(`${event.homeScore.display}:${event.awayScore.display}`)
  }, [event])

  if (error) {
    return (
      <p>An error occurred. :/ <b>{error.message}</b></p>
    )
  }

  if (!event) {
    return (
      <p>Event found! :(</p>
    )
  }

  return (
    <>
      <Head>
        <title>{event.homeTeam.shortName} vs {event.awayTeam.shortName} | SofaSkoro</title>
      </Head>

      <NavBar />

      <Container>
        <EventElement>
          <p></p>
        </EventElement>
        <h1>{score}{' '}{
            event.status.type === 'inprogress' && (
              <LiveIndicator>LIVE!</LiveIndicator>
            )
          }</h1>
        <p><Subtitle>Home team:</Subtitle> {event.homeTeam.name}</p>
        <p><Subtitle>Away team:</Subtitle> {event.awayTeam.name}</p>
        <EventTournament>{event.tournament.name}</EventTournament>

      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context

  try {
    const { id } = query

    const categoryEventsEndpointUrl = API_BASE_URL + `/event/${id}`
    const { event } = await swrFetcher(categoryEventsEndpointUrl)

    return {
      props: {
        event
      }
    }
  } catch ({ error }) {
    res.statusCode = 404;

    return {
      props: {
        error
      }
    }
  }
}

export default EventPage