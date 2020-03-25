import React from 'react'
import { shallow } from 'enzyme'
import { GenericInput } from '../view/pages/components/GenericInput'

describe('GenericInput', () => {
  it('Render GenericInput without Classname', () => {
    const genericInput = shallow(
      <GenericInput inputValue="sd" setInputValue={() => '0'} type="text" placeholder="text" />
    )
    expect(genericInput).toMatchSnapshot()
  })
  it('Render GenericInput with Classname', () => {
    const genericInput = shallow(
      <GenericInput
        inputValue="sd"
        setInputValue={() => '0'}
        type="text"
        placeholder="text"
        className="text"
      />
    )
    expect(genericInput).toMatchSnapshot()
  })
})
