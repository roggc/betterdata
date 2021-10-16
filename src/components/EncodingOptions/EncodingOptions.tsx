import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export enum EncodingTypeEnum {
  Categorical,
  Digit,
}

interface IEncodingOptionsProps {
  encodingType: EncodingTypeEnum
  valuesRef: React.MutableRefObject<string[]>
  setValueChanged: React.Dispatch<React.SetStateAction<boolean>>
  index: number
}

const EncodingOptions: React.FC<IEncodingOptionsProps> = ({
  encodingType,
  valuesRef,
  index,
  setValueChanged,
}) => {
  const [inputValue, setInputValue] = useState(valuesRef.current[index])

  useEffect(() => {
    if (inputValue) {
      valuesRef.current[index] = inputValue
    }
  }, [inputValue, index])

  const updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern =
      encodingType === EncodingTypeEnum.Categorical
        ? '(^[1-9][0-9]*$|^$)'
        : '^([0-9]*[.]?[0-9]*)$'
    const regExp = new RegExp(pattern)
    const value = e.target.value
    if (regExp.test(value)) setInputValue(value)
  }
  const getLabel = () => {
    return encodingType === EncodingTypeEnum.Categorical
      ? 'Threshold'
      : 'Precision'
  }

  return (
    <Wrapper>
      {getLabel()}:{' '}
      <input type="text" value={inputValue} onChange={updateInputValue} />
    </Wrapper>
  )
}

export default EncodingOptions

const Wrapper = styled.div`
  display: flex;
`
