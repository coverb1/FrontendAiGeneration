import { Routes, Route } from 'react-router-dom'

import LoadingStatus from './components/LoadingStatus'
import StoryGame from './components/StoryGame'
import StoryGenerator from './components/StoryGenerator'
import StoryLoader from './components/storyLoader'
import ThemeInput from './components/ThemeInput'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ThemeInput />} />

      <Route path="/loading" element={<LoadingStatus />} />

      <Route path="/generate" element={<StoryGenerator />} />

      <Route path="/load-story" element={<StoryLoader />} />

    </Routes>
  )
}

export default App