import React from 'react'

interface ILoginProps {
  inputValue: string
  setInputValue(value: string): void
  type: string
  placeholder: string
  className?: string
}
export const GenericInput: React.FC<ILoginProps> = props => {
  return (
    <div className="input-container">
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={props.className}
        value={props.inputValue}
        onChange={e => props.setInputValue(e.target.value)}
      />
    </div>
  )
}
