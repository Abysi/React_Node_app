import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import { LoginButton } from '../view/pages/components/LoginButton'

describe('LoginButton', () => {
  it('Render LoginButton', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: jest.fn(),
      }),
    }))
    const loginButton = shallow(
      <MemoryRouter>
        <LoginButton username="Bob" password="Ed" />
      </MemoryRouter>
    )
    expect(loginButton).toMatchSnapshot()
  })
})
