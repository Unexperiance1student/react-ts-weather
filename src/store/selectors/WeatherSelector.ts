import { WeatherState } from '../../helpers/types'

export const weatherSelector = (state: { weather: WeatherState }) =>
  state.weather
