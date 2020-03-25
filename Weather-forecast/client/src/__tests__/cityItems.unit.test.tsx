import React from 'react'
import { shallow } from 'enzyme'
import { CityItems, ICity } from '../view/pages/components/CityItems'

describe('CityItems', () => {
  const city: ICity = {
    name: 'string',
    countryCode: 'string',
    id: 0,
    temperature: 0,
    humidity: 0,
    tomorrowTemperature: 0,
    tomorrowHumidity: 0,
    dayAfterTomorrowTemperature: 0,
    dayAfterTomorrowHumidity: 0,
  }
  const arrayIcity = [city, city]

  it('Render CityItems', () => {
    const cityItems = shallow(<CityItems cityList={arrayIcity} onRemove={() => true} />)
    expect(cityItems).toMatchSnapshot()
  })
})
