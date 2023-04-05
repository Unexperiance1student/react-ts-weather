import {
  cityInfType,
  forecastParams,
  forecastType,
  WeatherState,
} from '../../helpers/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

const BASE_URL = 'http://api.openweathermap.org'

export const searchCity = createAsyncThunk<
  cityInfType[],
  string,
  { rejectValue: string }
>(
  'weather/searchCity',

  async (term, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/geo/1.0/direct?q=${term.trim()}&limit=5&lang=en&appid=${
          process.env.REACT_APP_API_KEY
        }`
      )
      const { data } = response
      return data
    } catch (err) {
      const error: AxiosError<string> = err as any
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.message)
    }
  }
)

export const searchForecast = createAsyncThunk<
  forecastType,
  forecastParams,
  { rejectValue: string }
>(
  'weather/searchForecast',

  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
      )
      const { data } = response
      const forecastData = {
        ...data.city,
        list: data.list.slice(0, 16),
      }
      return forecastData
    } catch (err) {
      const error: AxiosError<string> = err as any
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.message)
    }
  }
)

const initialState: WeatherState = {
  isSearchLoading: null,
  isForecastLoading: null,
  isError: null,
  cityWeather: [],
  forecastList: null,
}

export const WeatherApiSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCity.pending, (state, action) => {
        state.isSearchLoading = true
      })
      .addCase(searchCity.fulfilled, (state, action) => {
        state.isSearchLoading = false
        state.cityWeather = action.payload
      })
      .addCase(searchCity.rejected, (state, action) => {
        state.isSearchLoading = false
        if (action.payload) state.isError = action.payload
      })
      .addCase(searchForecast.pending, (state, action) => {
        state.isForecastLoading = true
      })
      .addCase(searchForecast.fulfilled, (state, action) => {
        state.isForecastLoading = false
        state.forecastList = action.payload
      })
      .addCase(searchForecast.rejected, (state, action) => {
        state.isForecastLoading = false
        if (action.payload) state.isError = action.payload
      })
  },
})

export const {} = WeatherApiSlice.actions

export default WeatherApiSlice.reducer
