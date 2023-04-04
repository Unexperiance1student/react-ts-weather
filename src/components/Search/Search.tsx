import { FC } from 'react'
import { SearchProps, cityInfType } from '../../helpers/types'
import { useAppSelector } from '../../helpers/hooks'
import { weatherSelector } from '../../store/selectors/WeatherSelector'

const Search: FC<SearchProps> = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}) => {
  const { isSearchLoading } = useAppSelector(weatherSelector)

  return (
    <section className="flex flex-col items-center justify-center w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
      <h1 className="text-4xl font-thin">
        Weather <span className="font-black">Forecast</span>
      </h1>
      <p className="text-sm mt-2">
        Enter below a place you want to know the weather of and select an option
        from dropdown
      </p>
      <div className="flex relative justify-center items-center mt-10 md:mt-4">
        <input
          onChange={onInputChange}
          type="text"
          value={term}
          className="px-2 py-1 rounded-l-md border-2 border-white "
        />
        <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
          {!isSearchLoading &&
            options.map((option: cityInfType, index: number) => (
              <li key={option.name + '-' + index}>
                <button
                  onClick={() => onOptionSelect(option)}
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                >
                  {option.name}
                </button>
              </li>
            ))}
        </ul>
        <button
          onClick={onSubmit}
          className="rounded-r-md border-2 border-zinc-100 text-zinc-100 hover:border-zinc-500 hover:text-zinc-500 px-2 py-1 cursor-pointer"
        >
          Search
        </button>
      </div>
    </section>
  )
}

export default Search
