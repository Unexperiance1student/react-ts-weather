import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export interface CounterState {
  value: number
}
type WeatherInf = {
  message: string
}

export const fetchWeather = createAsyncThunk<
  WeatherInf,
  undefined,
  { rejectValue: string }
>(
  'weather/getWeather',

  async (_, { rejectWithValue }) => {
    // const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
    // console.log(res)
    // if (res.data.length === 0) {
    //   console.log(res)
    //   return rejectWithValue('Failed to fetch todos.')
    // }
    // return res.data
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/atodos/1`
      )
      const { data } = response
      return data
    } catch (err) {
      const error: AxiosError<string> = err as any
      if (!error.response) {
        console.log(err)
        throw err
      }
      return rejectWithValue(error.message)
    }
  }
)

const initialState: CounterState = {
  value: 0,
}

export const WeatherApiSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    changeIncrementAmount: (state, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        // console.log(action)
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        console.log(action)
      })
  },
})

export const { changeIncrementAmount } = WeatherApiSlice.actions

export default WeatherApiSlice.reducer
