import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import LoadingStatus from './components/LoadingStatus'
import StoryGame from './components/StoryGame'
import storyGenerator from './components/StoryGenerator'
import storyLoader from './components/storyLoader'
import ThemeInput from './components/ThemeInput'
import { Route } from 'react-router-dom'


function App() {
  return (
   <Routes>

<Route path="/" element={<ThemeInput />} />
<Route path="/loading" element={<LoadingStatus />} />
<Route path="/loading" element={<storyGenerator />} />
<Route path="/loading" element={<storyLoader />} />
<Route path="/story" element={<StoryGame />} />

   </Routes>
  )
}
import { Routes } from 'react-router-dom'

export default App
