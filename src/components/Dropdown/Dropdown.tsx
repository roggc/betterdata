import { useState } from 'react'

export interface IDropdownItem {
  label: string
  value: string
}

interface IDropdownProps {
  items: IDropdownItem[]
  initialSelectedIndex?: number
}

const Dropdown: React.FC<IDropdownProps> = ({
  items,
  initialSelectedIndex,
}) => {
  const [value, setValue] = useState(
    initialSelectedIndex !== undefined
      ? items[initialSelectedIndex].value
      : undefined
  )
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
