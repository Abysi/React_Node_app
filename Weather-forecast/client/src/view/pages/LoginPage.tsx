import React, { useState } from 'react'

import { GenericInput } from './components/GenericInput'
import { LoginButton } from './components/LoginButton'

export default function LoginPage() {
  const [username, setLogin] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="app">
      <GenericInput
        inputValue={username}
        setInputValue={setLogin}
        type="text"
        placeholder="Username"
      />
      <GenericInput
        inputValue={password}
        setInputValue={setPassword}
        type="password"
        placeholder="Password"
      />
      <LoginButton username={username} password={password} />
    </div>
  )
}
