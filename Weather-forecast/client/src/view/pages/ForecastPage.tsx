import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { ICity } from './components/CityItems'
import { CityItems } from './components/CityItems'
import { getWeatherReport, updateUserCityList } from '../../api/requests'
import { fillWeatherReport } from '../../helpers/reportCity'
import { GenericInput } from './components/GenericInput'

export default function ForecastPage() {
  const history = useHistory()
  if (sessionStorage.getItem('login') === null) history.push('/')
  const [cityList, setCityList] = useState<ICity[]>([])
  const [citySearchValue, setCitySearchValue] = useState('')

  useEffect(() => {
    if (cityList.length === 0) {
      const arrItems: string | null = sessionStorage.getItem('cityArray')
      if (arrItems !== null) {
        console.log('Get Weather report to user cities')
        arrItems.split(',').forEach(elem => {
          createWeatherReport(elem)
        })
      }
    } else {
      console.log('Update user info')
      const cityArray: string[] = cityList.map(elem => elem.name)
      updateUserCityList(cityArray, sessionStorage.getItem('login')).catch(err => console.log(err))
    }
  },[cityList])

  async function createWeatherReport(CitySearchValue: string) {
    console.log(`Get weather report for ${CitySearchValue}`)
    const result = await getWeatherReport(CitySearchValue).catch(err => console.log(err.response))
    const cityWeather: ICity = fillWeatherReport(result.data)
    setCitySearchValue('')
    if (cityList.length >= 10) {
      cityList.shift()
    }
    setCityList(oldArray => [...oldArray, cityWeather])
  }
  const removeHandler = (id: number) => {
    setCityList(prev => prev.filter(city => city.id !== id))
  }

  return (
    <div className="forecast-page">
      <div className="city-search-block">
        <GenericInput
          inputValue={citySearchValue}
          setInputValue={setCitySearchValue}
          type="text"
          placeholder="Enter city,and code e.g:Kiev,Ua "
          className="search-input"
        />
        <button className="search-button" onClick={() => createWeatherReport(citySearchValue)}>
          Get weather report
        </button>
      </div>
      <CityItems cityList={cityList} onRemove={removeHandler} />
    </div>
  )
}
