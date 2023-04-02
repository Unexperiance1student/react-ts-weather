import { ChangeEvent } from 'react'

export type cityInfType = {
  name: string
  lat: number
  lon: number
  country: string
}

export interface WeatherState {
  isLoading: boolean | null
  isError: string | null
  cityWeather: cityInfType[]
  forecastList: forecastType | null
}

export type forecastParams = {
  lat: number
  lon: number
}

export type forecastType = {
  name: string
  country: string
  list: [
    {
      dt: number
      main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
      }
      weather: [
        {
          main: string
          icon: string
          description: string
        }
      ]
      wind: {
        speed: number
        gust: number
        deg: number
      }
      clouds: {
        all: number
      }
      pop: number
      visibility: number
    }
  ]
  sunrise: number
  sunset: number
}

export type SearchProps = {
  term: string
  options: cityInfType[]
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (city: cityInfType) => void
  onSubmit: () => void
}
