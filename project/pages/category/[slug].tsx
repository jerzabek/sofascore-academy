import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { swrFetcher } from "../../api/API";
import { API_BASE_URL } from "../../api/Constants";
import { Container } from "../../components/Common";
import { EventInfo } from "../../model/Event";
import NavBar from "../../modules/common/NavBar";
import getFormattedDate from "../../util/FormattedDate";
import { TournamentData } from "../../modules/category/TournamentPreview";
import TournamentPreview from '../../modules/category/TournamentPreview'
import Footer from "../../modules/common/Footer";

interface CategoryPageProps {
  events?: TournamentData[]
  error?: Error
}

const CategoryPage: NextPage<CategoryPageProps> = ({ events, error }) => {
  if (error) {
    return (
      <p>An error occurred. :/ <b>{error.message}</b></p>
    )
  }

  if (!events) {
    return (
      <p>No events found! :(</p>
    )
  }

  return (
    <>
      <Head>
        <title>Events in category | SofaSkoro</title>
      </Head>

      <NavBar />

      <Container>
        {
          events.map((tournament) => (
            <React.Fragment key={tournament.id}>
              <TournamentPreview tournament={tournament} />
            </React.Fragment>
          ))
        }
      </Container>

      <Footer />
    </>
  )
}

function parseEvents(events: EventInfo[]) {
  const tempTournaments: TournamentData[] = [];
  const ids: number[] = [];

  // Extract all unique tournaments (NOT UniqueTournaments but tournaments that are unique) from event list
  events.forEach(event => {
    if (ids.includes(event.tournament.id)) {
      return
    }

    ids.push(event.tournament.id)
    tempTournaments.push({
      id: event.tournament.id,
      tournament: event.tournament,
      events: []
    })
  })

  // Categorizes events based on tournaments
  tempTournaments.forEach(tournament => {
    // We use Number wrapper to keep typescript happy - Object.keys returns string[]
    // We know the id is always a number
    tournament.events = events.filter(event => event.tournament.id === tournament.id)
  })

  return tempTournaments
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context

  try {
    const { slug } = query

    const categoryEventsEndpointUrl = API_BASE_URL + `/category/${slug}/scheduled-events/${getFormattedDate()}`
    const { events } = await swrFetcher(categoryEventsEndpointUrl)

    return {
      props: {
        events: parseEvents(events)
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

export default CategoryPage