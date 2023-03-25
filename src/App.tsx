import { useEffect } from 'react'
import { useAppDispatch } from './helpers/hooks'
import { fetchWeather } from './store/slice/WeatherApiSlice'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  return (
    <main className="text-center flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="flex flex-col items-center justify-center w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an
          option from dropdown
        </p>
        <div className="flex justify-center items-center mt-10 md:mt-4">
          <input
            type="text"
            value={'s'}
            className="px-2 py-1 rounded-l-md border-2 border-white "
          />
          <button className="rounded-r-md border-2 border-zinc-100 text-zinc-100 hover:border-zinc-500 hover:text-zinc-500 px-2 py-1 cursor-pointer">
            search
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
