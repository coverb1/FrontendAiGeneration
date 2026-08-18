import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import LoadingStatus from "./LoadingStatus"
import StoryGame from "./StoryGame"

// This is the starting address (home base) for all our API calls
const API_BASE_URL = "/api"

function StoryLoader() {

  // Get the story ID from the website link
  // Example: if link is /story/5 then id = 5
  const { id } = useParams()

  // This lets us send the user to a different page later
  const navigate = useNavigate()

  // These are like "boxes" that hold information that can change

  // Box for the story once we get it from the server
  const [story, setStory] = useState(null)

  // Box that tells us: are we still waiting for data? (true/false)
  const [loading, setLoading] = useState(true)

  // Box that holds an error message if something goes wrong
  const [error, setError] = useState(null)

  // This runs automatically when the page opens
  // It also runs again if "id" changes (user opens a different story)
  useEffect(() => {
    loadStory(id)
  }, [id])

  // This function goes and gets the story from the server
  const loadStory = async (storyId) => {
    // Step 1: turn ON loading (show spinner)
    setLoading(true)
    setError(null)

    try {
      // Step 2: ask the server for the story
      const response = await axios.get(`${API_BASE_URL}/stories/${storyId}/complete`)

      // Step 3: save the story we got back
      setStory(response.data)
    } catch (error) {
      // Something went wrong while asking the server

      if (error.response?.status === 404) {
        // Server said: "this story does not exist"
        setError("Story not found.")
      } else {
        // Any other kind of problem (internet, server crash, etc.)
        setError("Failed to load story.")
      }
    } finally {
      // This ALWAYS runs, no matter what happened above
      // Step 4: turn OFF loading (hide spinner)
      setLoading(false)
    }
  }

  // This function sends the user back to the homepage
  // (used when there is an error, so they can try again)
  const createNewStory = () => {
    navigate("/")
  }

  // CASE 1: still waiting for the story? Show a spinner.
  if (loading) {
    return <LoadingStatus theme={"story"} />
  }

  // CASE 2: something went wrong? Show error + a button to go back.
  if (error) {
    return (
      <div>
        <h2>Story not found</h2>
        <p>{error}</p>
        <button onClick={createNewStory}>Go to Story Generator</button>
      </div>
    )
  }

  // CASE 3: we have a story? Show it using the StoryGame component.
  if (story) {
    return (
      <div className="">
        <StoryGame story={story} onNewStory={createNewStory} />
        <div>hey my name is mucyo bruce</div>
      </div>
    )
  }

  // CASE 4 (fallback): not loading, no error, but no story either.
  // This should rarely happen, but React always needs SOMETHING returned.
  return null
}

export default StoryLoader