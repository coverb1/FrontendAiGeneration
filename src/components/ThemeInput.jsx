import { useState } from "react"

function ThemeInput({ onSubmit }) {
  const [theme, setTheme] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!theme.trim()) {
      setError("Please enter a theme name")
      return
    }

    setError("")
    onSubmit(theme)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        Generate Your Adventure
      </h2>
      <p className="text-gray-500 mb-6">
        Enter a theme for your interactive story
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input type="text" value={theme} onChange={(e) => {setTheme(e.target.value)
              if (error) setError("")
            }}
            placeholder="Enter a theme"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition"
        >
          Generate Story
        </button>
      </form>
    </div>
  )
}

export default ThemeInput