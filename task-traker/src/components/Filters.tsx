import { FILTERS_BUTTONS, FilterValue } from '../type.d'

interface Props {
  filter: FilterValue;
  handleFilterChange: (newFilter: FilterValue) => void;
}

export const Filters = ({ filter, handleFilterChange }: Props) => {
  return (
    <section className="flex justify-center mb-6">
      <ul className="flex gap-3 w-full max-w-[500px]">
        {Object.values(FILTERS_BUTTONS).map(({ key, label }) => {
          return (
            <li key={key}>
              <button
                className={`font-medium py-1 px-3 rounded-md border border-gray-400 dark:border-gray-800 ${
                  key === filter && 'border-blue-600 bg-blue-100 dark:border-blue-500 dark:bg-blue-950'
                } hover:scale-105 duration-300 hover:bg-blue-100 dark:hover:bg-blue-950`}
                onClick={() => {handleFilterChange(key)}}
              >
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}