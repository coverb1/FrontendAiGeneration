import { useState, useEffect } from "react"

// This component shows the story and lets the user pick choices
// It also needs "onNewStory" (a function) passed in from the parent,
// so the user can start a totally new/different story
function StoryGame({ story, onNewStory }) {

  // Box that holds the ID of the node (part of story) we are on right now
  const [currentNodeId, setCurrentNodeId] = useState(null)

  // Box that holds the actual node data (text, options, etc.) for that ID
  const [currentNode, setCurrentNode] = useState(null)

  // Box that holds the list of choices the user can pick from
  const [options, setOptions] = useState([])

  // Box that says: "has the story ended?" (true/false)
  const [isEnding, setIsEnding] = useState(false)

  // Box that says: "if it ended, was it a WINNING ending?" (true/false)
  const [isWinningEnding, setIsWinningEnding] = useState(false)

  // When the story first loads, jump to the starting point (root node)
  useEffect(() => {
    if (story && story.root_node) {
      setCurrentNodeId(story.root_node.id)
    }
  }, [story])

  // Whenever we move to a new node, update everything on screen
  useEffect(() => {
    if (currentNodeId && story.all_nodes) {
      // Find the node data that matches our current ID
      const node = story.all_nodes[currentNodeId]
      setCurrentNode(node)
      setIsEnding(node.is_ending)
      setIsWinningEnding(node.is_winning)

      // If the story is NOT over, and there are choices, show them
      if (!node.is_ending && node.options && node.options.length > 0) {
        setOptions(node.options)
      } else {
        // If the story ended, clear out old choices
        setOptions([])
      }
    }
  }, [currentNodeId, story])

  // Called when the user clicks a choice button
  // It moves the story forward to whatever node that choice leads to
  const chooseOption = (optionId) => {
    setCurrentNodeId(optionId)
  }

  // Sends the user back to the very start of the SAME story
  const restartStory = () => {
    if (story && story.root_node) {
      setCurrentNodeId(story.root_node.id)
    }
  }

  return (
    <div className="">
      {/* Story title at the top */}
     {story && (
  <p className="h-45">{story.title}</p>

)}

      <div>
        {/* Show the current part of the story, if we have one */}
        {currentNode && (
          <div>
            <p>{currentNode.content}</p>

            {/* If this node is an ending, show a message */}
            {isEnding && (
              <div>
                <h3>{isWinningEnding ? "Congratulations!" : "The End"}</h3>
              </div>
            )}
          </div>
        )}

        {/* Show all the choice buttons */}
        <div>
          {options.map((option, index) => {
            return (
              <button key={index} onClick={() => chooseOption(option.node_id)}>
                {option.text}
              </button>
            )
          })}
        </div>

        {/* Bottom controls: restart same story, or start a brand new one */}
        <div className="story-controls">
          <button onClick={restartStory}>Restart Story</button>

          {onNewStory && (
            <button onClick={onNewStory} className="">
              New Story hy
            </button>
            
          )}
        </div>
      </div>
    </div>
  )
}

export default StoryGame