import { useEffect, useState } from 'react'

export interface IDropdownItem {
  label: string
  value: string
}

interface IDropdownProps {
  items: IDropdownItem[]
  initialSelectedIndex?: number
  valuesRef: React.MutableRefObject<string[]>
  index: number
  setFoo:React.Dispatch<React.SetStateAction<boolean>>
}

const Dropdown: React.FC<IDropdownProps> = ({
  items,
  initialSelectedIndex,
  valuesRef,
  index,
  setFoo
}) => {
  const [value, setValue] = useState(valuesRef.current[index])

  useEffect(() => {
    if (value) {
      valuesRef.current[index] = value
      setFoo(foo=>!foo)
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
