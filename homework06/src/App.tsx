import { SWRConfig } from 'swr'
import { swrConfig } from './API'
import OpenTDB from './components/OpenTDB'

function App() {

  return (
    <SWRConfig value={swrConfig}>
      <OpenTDB />
    </SWRConfig>
  )
}

export default App
