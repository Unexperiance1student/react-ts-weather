import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './helpers/hooks'
import { weatherSelector } from './store/selectors/WeatherSelector'
import { searchCity, searchForecast } from './store/slice/WeatherApiSlice'
import { cityInfType, forecastType } from './helpers/types'
import Search from './components/Search/Search'

const App = () => {
  const dispatch = useAppDispatch()

  const { cityWeather, forecastList } = useAppSelector(weatherSelector)
  const [options, setOptions] = useState<cityInfType[]>([])
  const [term, setTerm] = useState<string>('')
  const [city, setCity] = useState<cityInfType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') return
    dispatch(searchCity(term))
    setOptions(cityWeather)
  }
  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  const getForecast = (city: cityInfType) => {
    dispatch(searchForecast({ lat: city.lat, lon: city.lon }))
    setForecast(forecastList)
  }

  const onOptionSelect = (option: cityInfType) => {
    setCity(option)
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return (
    <main className="text-center flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      {forecast ? (
        'we have a forecast'
      ) : (
        <Search
          options={options}
          term={term}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  )
}

export default App
