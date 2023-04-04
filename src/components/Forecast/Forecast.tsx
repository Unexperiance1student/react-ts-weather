import React, { FC } from 'react'
import { ForecastProps } from '../../helpers/types'
import { useAppSelector } from '../../helpers/hooks'
import { weatherSelector } from '../../store/selectors/WeatherSelector'

const Degree = ({ temp }: { temp: number }) => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
)

const Forecast: FC<ForecastProps> = ({ forecast }) => {
  const { isForecastLoading } = useAppSelector(weatherSelector)

  const today = forecast.list[0]
  return (
    <>
      {!isForecastLoading ? (
        <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-1s rounded drop-shadow-lg">
          <div className="mx-auto w-[300px]">
            <section className="text-center">
              <h2 className="text-2xl font-black">
                {forecast.name}{' '}
                <span className="font-thin"> {forecast.country}</span>
              </h2>
              <h1 className="text-4xl font-extrabold">
                <Degree temp={Math.round(today.main.temp)} />
              </h1>
              <p className="text-sm">
                {today.weather[0].main} {today.weather[0].description}
              </p>
              <p className="text-sm">
                H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:
                <Degree temp={Math.floor(today.main.temp_min)} />
              </p>
            </section>
            <section>
              {forecast.list.map((item, index) => (
                <div key={item.dt + index}>
                  <p>{item.dt}</p>
                  alt={`weather-icon-${item.weather[0].description}`}
                  src=
                  {`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                </div>
              ))}
            </section>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default Forecast
