import axios from 'axios'

import { serverUrl } from '../config/config'
import { IAuthProps } from '../view/pages/components/LoginButton'

export async function login(user: IAuthProps) {
  try {
    const result = await axios.post(`${serverUrl}/login`, user)
    return result
  } catch (error) {
    return error
  }
}

export async function getWeatherReport(cityInfo: string) {
  try {
    const result = await axios.post(`${serverUrl}/getWeatherReport`, { cityInfo })
    return result
  } catch (error) {
    return error
  }
}

export async function updateUserCityList(cityNames: string[], username: any) {
  try {
    await axios.post(`${serverUrl}/updateUser`, { cityNames, username })
  } catch (error) {
    return error
  }
}
