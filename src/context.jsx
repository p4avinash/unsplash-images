import { createContext, useContext, useState, useEffect } from "react"

const AppContext = createContext()

const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem("darkTheme") === "true"
  return storedDarkMode
}

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState("cat")

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    const body = document.querySelector("body")
    body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }

  useEffect(() => {
    const body = document.querySelector("body")
    body.classList.toggle("dark-theme", isDarkTheme)
  }, [])

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
