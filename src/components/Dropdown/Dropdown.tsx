import { useEffect, useState } from 'react'

export interface IDropdownItem {
  label: string
  value: string
}

interface IDropdownProps {
  items: IDropdownItem[]
  valuesRef: React.MutableRefObject<string[]>
  index: number
  setValueChanged:React.Dispatch<React.SetStateAction<{
    value: boolean;
    index: number;
}>>
}

const Dropdown: React.FC<IDropdownProps> = ({
  items,
  valuesRef,
  index,
  setValueChanged
}) => {
  const [value, setValue] = useState(valuesRef.current[index])

  useEffect(() => {
    if (value) {
      valuesRef.current[index] = value
      setValueChanged(state=>({...state,value:!state.value,index}))
    }
  }, [value,index])

  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.currentTarget.value)
      }}
    >
      {items.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
