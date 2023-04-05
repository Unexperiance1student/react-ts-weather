import Forecast from './components/Forecast/Forecast'
import Search from './components/Search/Search'
import { useAppSelector } from './helpers/hooks'
import useForecast from './helpers/useForecast'
import { weatherSelector } from './store/selectors/WeatherSelector'

const App = () => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast()

  const { isForecastLoading } = useAppSelector(weatherSelector)
  if (isForecastLoading) {
    return <p>Loading...</p>
  }

  return (
    <main className="text-center flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      {!isForecastLoading && forecast ? (
        <Forecast forecast={forecast} />
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
