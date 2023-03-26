import { ChangeEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from './helpers/hooks'
import { weatherSelector } from './store/selectors/WeatherSelector'
import { searchCity } from './store/slice/WeatherApiSlice'
import { cityInfType } from './helpers/types'

const App = () => {
  const dispatch = useAppDispatch()

  const { cityWeather } = useAppSelector(weatherSelector)
  const [options, setOptions] = useState<cityInfType[]>([])
  const [term, setTerm] = useState<string>('')
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') return
    dispatch(searchCity(term))
    setOptions(cityWeather)
  }
  const onOptionSelect = (option: cityInfType) => {}
  return (
    <main className="text-center flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="flex flex-col items-center justify-center w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an
          option from dropdown
        </p>
        <div className="flex relative justify-center items-center mt-10 md:mt-4">
          <input
            onChange={onInputChange}
            type="text"
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white "
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: cityInfType, index: number) => (
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
          <button className="rounded-r-md border-2 border-zinc-100 text-zinc-100 hover:border-zinc-500 hover:text-zinc-500 px-2 py-1 cursor-pointer">
            Search
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
