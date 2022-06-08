import useSWR from "swr"
import { API_BASE_URL, SOFA_API_TIMEZONE_DELAY } from "../api/Constants"
import { CategoryContainer } from "../components/Category"
import { Categories as CategoriesType, CategoryInfo } from "../model/Category"
import getFormattedDate from "../util/FormattedDate"

export default function Categories() {
  const { data: categoriesContainer, error: categoriesError } = useSWR<CategoriesType>(API_BASE_URL + `sport/football/${getFormattedDate()}/${SOFA_API_TIMEZONE_DELAY}/categories`)

  if (!categoriesContainer && !categoriesError) {
    return (
      <p>Loading...</p>
    )
  } else if (!categoriesContainer) {
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
    <div>
      {
        categoriesContainer.categories.map((categoryInfo, index) => (
          <Category key={index} category={categoryInfo} />
        ))
      }

    </div>
  )
}

interface CategoryProps {
  category: CategoryInfo
}

export function Category({ category }: CategoryProps) {
  return (
    <CategoryContainer>
      <p># of events: {category.totalEvents}</p>
      <p>Country: {category.category.name}</p>
    </CategoryContainer>
  )
}