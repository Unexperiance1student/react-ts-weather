import { configureStore } from '@reduxjs/toolkit'
import WeatherApiSlice from './slice/WeatherApiSlice'

export const store = configureStore({
  reducer: {
    weather: WeatherApiSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
