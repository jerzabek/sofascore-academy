import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { swrFetcher } from "../../api/API";
import { API_BASE_URL } from "../../api/Constants";
import { Container } from "../../components/Common";
import { Error } from "../../model/Error";
import { EventInfo } from "../../model/Event";
import NavBar from "../../modules/common/NavBar";
import getFormattedDate from "../../util/FormattedDate";

interface CategoryPageProps {
  events?: EventInfo[]
  error?: Error
}

const CategoryPage: NextPage<CategoryPageProps> = ({ events, error }) => {
  const router = useRouter()
  const { slug } = router.query

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
          events.map((event) => (
            <Event key={event.id} event={event} />
          ))
        }
      </Container>
    </>
  )
}

interface EventProps {
  event: EventInfo
}

function Event({ event }: EventProps) {
  return (
    <>
      <p>{event.tournament.name} - {event.homeTeam.name} vs {event.awayTeam.name} ({event.homeScore.display}:{event.awayScore.display})</p>
      <Link href={`/event/${event.id}`}>Link na event</Link>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context

  try {
    const { slug } = query

    const categoryEventsEndpointUrl = API_BASE_URL + `/category/${slug}/scheduled-events/${getFormattedDate()}`
    const { events } = await swrFetcher(categoryEventsEndpointUrl)

    return {
      props: {
        events
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