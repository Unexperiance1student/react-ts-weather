import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { cityInfType, forecastType } from './types'
import { searchCity, searchForecast } from '../store/slice/WeatherApiSlice'
import { weatherSelector } from '../store/selectors/WeatherSelector'

const useForecast = () => {
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

  return { term, options, forecast, onInputChange, onOptionSelect, onSubmit }
}

export default useForecast
