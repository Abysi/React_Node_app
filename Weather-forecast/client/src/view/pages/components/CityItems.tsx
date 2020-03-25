import React from 'react'
import { dayName, weatherIcons } from '../../../config/config'

export interface ICity {
  name: string
  countryCode: string
  id: number
  temperature: number
  humidity: number
  tomorrowTemperature: number
  tomorrowHumidity: number
  dayAfterTomorrowTemperature: number
  dayAfterTomorrowHumidity: number
}

export interface ICityItemProps {
  cityList: ICity[]
  onRemove: (id: number) => void
}

function getWeatherIcon(value: number) {
  console.log('Get icon type for weather card')
  let icon = 'icons '
  value <= 25
    ? (icon += weatherIcons[0])
    : value <= 50
    ? (icon += weatherIcons[1])
    : value <= 75
    ? (icon += weatherIcons[2])
    : (icon += weatherIcons[3])
  return <div className={icon} />
}

function getDayName(value: number) {
  console.log('Get day name for weather card')
  const tomorrowValue: number = new Date().getDay() + value
  return dayName[tomorrowValue % dayName.length]
}

function getWeatherColumn(day: number, temperature: number, humidity: number) {
  if (day >= 1) {
    return (
      <li>
        <span className="day-name">{getDayName(day)}</span>
        <div className="temperature">
          {temperature} <span className="degree">&#8451;</span>
        </div>
        {getWeatherIcon(humidity)}
      </li>
    )
  } else {
    return (
      <li>
        <div className="today">
          {temperature}
          <span className="degree">&#8451;</span>
        </div>
        {getWeatherIcon(humidity)}
      </li>
    )
  }
}

export const CityItems: React.FC<ICityItemProps> = prop => {
  function fillWeatherCard(props: ICity) {
    return (
      <div className="card" key={props.id}>
        <div className="city-name">
          {props.name}
          <button className="close hairline" onClick={() => prop.onRemove(props.id)} />
        </div>
        <ul className="days">
          {getWeatherColumn(0, props.temperature, props.humidity)}
          {getWeatherColumn(1, props.tomorrowTemperature, props.tomorrowHumidity)}
          {getWeatherColumn(2, props.dayAfterTomorrowTemperature, props.dayAfterTomorrowHumidity)}
        </ul>
      </div>
    )
  }
  return <div className="weather-card">{prop.cityList.map(elem => fillWeatherCard(elem))} </div>
}
