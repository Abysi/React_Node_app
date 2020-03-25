import React, { useState } from 'react'
import axios from 'axios'

import { login } from '../../../api/requests'
import { useHistory } from 'react-router-dom'

export interface IAuthProps {
  username: string
  password: string
}

export const LoginButton: React.FC<IAuthProps> = props => {
  const [isValid, setIsValid] = useState(true)
  const history = useHistory()
  async function authorize() {
    const result = await login(props)
      .then(response => response.data)
      .catch(err => console.log(err.response))
    if (result !== undefined) {
      setIsValid(true)
      axios.defaults.headers.common.authorization = 'Bearer ' + result.accessToken
      sessionStorage.setItem('login', result.login)
      sessionStorage.setItem('cityArray', result.cityArray)
      history.push('/forecast')
    } else {
      setIsValid(false)
    }
  }
  if (isValid) {
    return (
      <div>
        <button type="submit" onClick={() => authorize()}>
          Log In
        </button>
      </div>
    )
  } else {
    return (
      <div className="login-error">
        <label> Invalid login or password </label>
        <button type="submit" onClick={() => authorize()}>
          Log In
        </button>
      </div>
    )
  }
}
