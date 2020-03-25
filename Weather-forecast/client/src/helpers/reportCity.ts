import { ICity } from '../view/pages/components/CityItems'
import { convertCalvinToCel } from './convertTemp'

export function fillWeatherReport(data: any) {
  const city: ICity = {
    name: data.city.name,
    countryCode: data.city.country,
    id: data.city.id,
    temperature: convertCalvinToCel(data.list[0].main.temp),
    humidity: data.list[0].main.humidity,
    tomorrowTemperature: convertCalvinToCel(data.list[8].main.temp),
    tomorrowHumidity: data.list[8].main.humidity,
    dayAfterTomorrowTemperature: convertCalvinToCel(data.list[16].main.temp),
    dayAfterTomorrowHumidity: data.list[16].main.humidity,
  }
  return city
}
