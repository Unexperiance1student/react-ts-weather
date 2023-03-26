import { cityInfType, forecastParams, WeatherState } from '../../helpers/types'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
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
  cityInfType[],
  forecastParams,
  { rejectValue: string }
>(
  'weather/searchForecast',

  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
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

const initialState: WeatherState = {
  isLoading: null,
  isError: null,
  cityWeather: [],
}

export const WeatherApiSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // changeIncrementAmount: (state, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCity.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(searchCity.fulfilled, (state, action) => {
        state.isLoading = false
        state.cityWeather = action.payload
        console.log(action.payload)
      })
      .addCase(searchCity.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload) state.isError = action.payload
      })
  },
})

export const {} = WeatherApiSlice.actions

export default WeatherApiSlice.reducer
