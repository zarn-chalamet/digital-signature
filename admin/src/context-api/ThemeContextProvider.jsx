/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react"

export const ThemeContext = createContext()

const initialState = {
    theme: localStorage.getItem("theme") || "light",
}

const themeReducer = (state, action) => {
    switch (action.type) {
        case "theme/changed":
            return { ...state, theme: action.payload }
        default:
            return state
    }
}

export default function ThemeContextProvider({ children }) {
    const [{ theme }, dispatch] = useReducer(themeReducer, initialState)

    const changeTheme = (theme) => {
        dispatch({ type: 'theme/changed', payload: theme })
        localStorage.setItem('theme', theme)
    }

    const isDark = theme === 'dark'

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    )
}
