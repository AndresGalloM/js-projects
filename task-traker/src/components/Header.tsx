import { useTheme } from '../hooks/useTheme'
import { MoonIcon, SunIcon } from './icons'

export const Header = () => {
  const { theme, changeTheme } = useTheme()

  return (
    <header className="flex justify-between items-center py-3">
      <h1 className="font-bold text-3xl">Task Traker</h1>

      <div>
        <button 
          onClick={changeTheme} 
          className="group p-2 rounded-md opacity-75 transition-opacity duration-300 hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-900 "
        >
          {theme === 'dark' ? (
            <SunIcon className="size-6 duration-500 group-hover:-rotate-12" />
          ) : (
            <MoonIcon className="size-6 duration-500 group-hover:-rotate-12" />
          )}
        </button>
      </div>
    </header>
  )
}
