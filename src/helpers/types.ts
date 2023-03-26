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
}

export type forecastParams = {
  lat: number
  lon: number
}
