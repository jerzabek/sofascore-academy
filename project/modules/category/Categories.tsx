import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { swrFetcher } from "../../api/API"
import { API_BASE_URL, SOFA_API_TIMEZONE_DELAY } from "../../api/Constants"
import { CategoryList, CategoryListItem, CategoryEventsContainer, CategorySubtitle, CategoryTitle, CategoryEventPreviewElement, CategoryEventPreviewTournament, LiveIndicator } from "../../components/Category"
import { Container, FlexSpaceBetweenContainer } from "../../components/Common"
import { Categories as CategoriesType, CategoryInfo } from "../../model/Category"
import { EventInfo, Events } from "../../model/Event"
import getFormattedDate from "../../util/FormattedDate"

export default function Categories() {
  const categoriesAPIUrl = API_BASE_URL + `/sport/football/${getFormattedDate()}/${SOFA_API_TIMEZONE_DELAY}/categories`
  const { data: categoriesData, error: categoriesError } = useSWR<CategoriesType>(categoriesAPIUrl, swrFetcher)

  if (!categoriesData && !categoriesError) {
    return (
      <p>Loading...</p>
    )
  } else if (!categoriesData) {
    return (
      <div>
        <p>Could not load categories.</p>
        {
          categoriesError && (
            <p>Reason: {categoriesError}</p>
          )
        }
      </div>
    )
  }

  return (
    <CategoryList>
      {
        categoriesData.categories.map((categoryInfo) => (
          <React.Fragment key={categoryInfo.category.id}>
            <Category category={categoryInfo} />
            <hr />
          </React.Fragment>
        ))
      }

    </CategoryList>
  )
}

interface CategoryProps {
  category: CategoryInfo
}

export function Category({ category }: CategoryProps) {
  const [showEvents, setEventsVisible] = useState(false)
  const [eventList, setEventList] = useState<EventInfo[]>([])

  const categoryEventsEndpointUrl = API_BASE_URL + `/category/${category.category.id}/scheduled-events/${getFormattedDate()}`
  const { data: events, error: eventsError } = useSWR<Events>(showEvents ? categoryEventsEndpointUrl : null, swrFetcher)

  useEffect(() => {
    if (!events) {
      return
    }

    setEventList(events.events)
  }, [events])

  function toggleCategoryEvents() {
    setEventsVisible(eventsVisible => !eventsVisible)
  }

  return (
    <>
      <CategoryListItem onClick={toggleCategoryEvents}>
        <FlexSpaceBetweenContainer>
          <CategoryTitle>{category.category.name}</CategoryTitle>
          <CategorySubtitle># of events: {category.totalEvents}</CategorySubtitle>
        </FlexSpaceBetweenContainer>


        <Link href={`/category/${category.category.id}`}><a className="hoverable">More details...</a></Link>
      </CategoryListItem>

      <CategoryEventsContainer className={showEvents ? 'show' : ''}>
        {
          eventsError ? (
            <p>No events available.</p>
          ) : (
            eventList.map((event) => (
              <EventPreview key={event.id} event={event} />
            ))
          )
        }
      </CategoryEventsContainer>
    </>
  )
}

interface EventPreviewProps {
  event: EventInfo
}

function EventPreview({ event }: EventPreviewProps) {
  const [score, setScore] = useState('')

  useEffect(() => {
    if (!("display" in event.homeScore) || !("display" in event.awayScore)) {
      return
    }

    console.log(event)

    setScore(`(${event.homeScore.display}:${event.awayScore.display})`)
  }, [event])

  return (
    <>
      <Link href={`/event/${event.id}`}>
        <a>
          <CategoryEventPreviewElement>
            <CategoryEventPreviewTournament>{event.tournament.name}</CategoryEventPreviewTournament>
            <p>{
              event.status.type === 'inprogress' && (
                <LiveIndicator>LIVE!</LiveIndicator>
              )
            }{' '}<b>{event.homeTeam.shortName}</b> vs <b>{event.awayTeam.shortName}</b> {score}</p>
          </CategoryEventPreviewElement>
        </a>
      </Link>
    </>
  )
}