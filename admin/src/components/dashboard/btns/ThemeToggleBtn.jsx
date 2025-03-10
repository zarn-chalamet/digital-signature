import { Moon, Sun } from "lucide-react"
import useTheme from "../../../hooks/useTheme"
import { cn } from "../../../utils/cn"

export default function ThemeToggleBtn() {
    const { theme, changeTheme, isDark } = useTheme()
    return (
        <button
            onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
            className={cn('flex items-center justify-center flex-shrink-0 h-10 p-2 transition-colors rounded-lg gap-x-2 text-slate-500 hover:bg-slate-100 hover:text-slate-500  size-10', isDark && 'hover:bg-blue-950 hover:text-slate-200')}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    )
}
