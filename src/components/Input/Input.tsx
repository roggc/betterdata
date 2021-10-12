import { useEffect, useRef } from 'react'
import { useOutsideClick } from '../../hooks'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onOutsideClick: () => void
}

const Input: React.FC<IInputProps> = ({ onOutsideClick, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useOutsideClick(inputRef, onOutsideClick)
  return <input {...props} ref={inputRef} />
}

export default Input
