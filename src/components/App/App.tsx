import styled from 'styled-components'
import { ThemeProvider } from '../providers'
import { useEffect, useState, Fragment, useRef,useLayoutEffect } from 'react'
import CSVReader from 'react-csv-reader'
import I from '../Input'
import Dd, { IDropdownItem } from '../Dropdown'
import EncodingOptions, { EncodingTypeEnum } from '../EncodingOptions'

const FIRST_OR_DEFAULT = 0
const TABLE_HEIGHT = 600
const editTableColumnNames = [
  'Name',
  'Include',
  'Encoding type',
  'Encoding options',
]
const FIRST_NUMBER_OF_ROWS = 31
const includeDropdownItems: IDropdownItem[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
const encodingTypeDropdownItems: IDropdownItem[] = [
  { value: 'categorical', label: 'Categorical' },
  { value: 'digit', label: 'Digit' },
]

const App = () => {
  const [data, setData] = useState<any[][]>([])
  const [isEditView, setIsEditView] = useState(false)
  const [isEditName, setIsEditName] = useState(
    data[FIRST_OR_DEFAULT]?.map((_) => false)
  )
  const [name, setName] = useState(data[FIRST_OR_DEFAULT])
  const [columnIsShown, setColumnIsShown] = useState(
    data[FIRST_OR_DEFAULT]?.map((_) => true)
  )
  const includeDropdownValuesRef = useRef<string[]>([])
  const [includeChange, setIncludeChange] = useState({ value: false, index: 0 })
  const encodingTypeDropdownValuesRef = useRef<string[]>([])
  const [encodingTypeChange, setEncodingTypeChange] = useState({
    value: false,
    index: 0,
  })
  const encodingOptionsValuesRef = useRef<string[]>([])
  const [encodingOptionChange, setEncodingOptionChange] = useState(false)

  useEffect(() => {
    if (
      encodingTypeDropdownValuesRef.current[encodingTypeChange.index] ===
      'categorical'
    ) {
      encodingOptionsValuesRef.current[encodingTypeChange.index] = '1'
      setEncodingOptionChange(value=>!value)
    } else if (
      encodingTypeDropdownValuesRef.current[encodingTypeChange.index] ===
      'digit'
    ) {
      encodingOptionsValuesRef.current[encodingTypeChange.index] = '0.1'
      setEncodingOptionChange(value=>!value)
    }
  }, [encodingTypeChange.value])

  const onFileLoaded = (data: any[][]) => {
    includeDropdownValuesRef.current = data[FIRST_OR_DEFAULT]?.map((_) => '')
    encodingTypeDropdownValuesRef.current = data[FIRST_OR_DEFAULT]?.map(
      (_) => 'categorical'
    )
    encodingOptionsValuesRef.current = data[FIRST_OR_DEFAULT]?.map((_) => '1')
    setColumnIsShown(data[FIRST_OR_DEFAULT]?.map((_) => true))
    setIsEditName(data[FIRST_OR_DEFAULT]?.map((_) => false))
    setName(data[FIRST_OR_DEFAULT])
    setData(data.slice(0, FIRST_NUMBER_OF_ROWS))
  }

  useEffect(() => {
    includeDropdownValuesRef.current.some((value, index) => {
      if (value === 'yes' && !columnIsShown[index]) {
        setColumnIsShown((columnIsShown) => {
          const newColumnIsShown = [...columnIsShown]
          newColumnIsShown[index] = true
          return newColumnIsShown
        })
        return true
      }
      if (value === 'no' && columnIsShown[index]) {
        setColumnIsShown((columnIsShown) =>
          columnIsShown.map((isShown, index_) => {
            if (index === index_) return !isShown
            return isShown
          })
        )
        return true
      }
    })
  }, [includeChange, columnIsShown])

  const showEditView = () => {
    setIsEditView(true)
  }

  const showDataTable = () => {
    setIsEditView(false)
  }

  const editName = (index: number) => () => {
    setIsEditName((current) =>
      current.map((value, index_) => {
        if (index === index_ && !value) return !value
        return value
      })
    )
  }

  const toggleEditName = (index: number) => () => {
    setIsEditName((current) =>
      current.map((value, index_) => {
        if (index === index_) return !value
        return value
      })
    )
  }

  useEffect(() => {
    if (!isEditView) {
      setIsEditName((current) =>
        current?.map((value) => {
          if (value) return !value
          return value
        })
      )
    }
  }, [isEditView])

  const changeName = (index: number) => (e: any) => {
    setName((current) =>
      current.map((name, index_) => {
        if (index === index_) return e.target.value
        return name
      })
    )
  }

  useEffect(() => {
    if (isEditName && !isEditName.some((value) => value)) {
      setData((current) =>
        current.map((row, index) => {
          if (index === 0) return name
          return row
        })
      )
    }
  }, [isEditName, name])

  const getContent = () => {
    if (isEditView) {
      return (
        <>
          <Button onClick={showDataTable} type="button">
            done
          </Button>
          <EditTable>
            {editTableColumnNames.map((columnName, index) => {
              if (index === 0)
                return (
                  <Span key={columnName} isTopLeft isCenter>
                    {columnName}
                  </Span>
                )
              return (
                <Span key={columnName} isCenter>
                  {columnName}
                </Span>
              )
            })}
            {data[0]?.map((name_, index, array) => {
              if (index === 0)
                return (
                  <Fragment key={name_}>
                    <Span isPointer onClick={editName(index)}>
                      {isEditName[index] ? (
                        <Input
                          value={name[index]}
                          onOutsideClick={toggleEditName(index)}
                          onChange={changeName(index)}
                        />
                      ) : (
                        <span>{name[index]}</span>
                      )}
                    </Span>
                    <Span isCenter>
                      <Dropdown
                        items={includeDropdownItems}
                        valuesRef={includeDropdownValuesRef}
                        index={index}
                        setValueChanged={setIncludeChange}
                      />
                    </Span>
                    <Span isCenter>
                      <Dropdown
                        items={encodingTypeDropdownItems}
                        valuesRef={encodingTypeDropdownValuesRef}
                        index={index}
                        setValueChanged={setEncodingTypeChange}
                      />
                    </Span>
                    <Span>
                      {encodingTypeDropdownValuesRef.current[index] ===
                      'categorical' ? (
                        <EncodingOptions
                          encodingType={EncodingTypeEnum.Categorical}
                          index={index}
                          setValueChanged={setEncodingOptionChange}
                          valuesRef={encodingOptionsValuesRef}
                          key={encodingOptionsValuesRef.current[index]}
                        />
                      ) : (
                        <EncodingOptions
                          encodingType={EncodingTypeEnum.Digit}
                          index={index}
                          setValueChanged={setEncodingOptionChange}
                          valuesRef={encodingOptionsValuesRef}
                          key={encodingOptionsValuesRef.current[index]}
                        />
                      )}
                    </Span>
                  </Fragment>
                )
              if (index === array.length - 1)
                return (
                  <Fragment key={name_}>
                    <Span isBottomLeft isPointer onClick={editName(index)}>
                      {isEditName[index] ? (
                        <Input
                          value={name[index]}
                          onOutsideClick={toggleEditName(index)}
                          onChange={changeName(index)}
                        />
                      ) : (
                        <span>{name[index]}</span>
                      )}
                    </Span>
                    <Span isCenter>
                      <Dropdown
                        items={includeDropdownItems}
                        valuesRef={includeDropdownValuesRef}
                        index={index}
                        setValueChanged={setIncludeChange}
                      />
                    </Span>
                    <Span isCenter>
                      <Dropdown
                        items={encodingTypeDropdownItems}
                        valuesRef={encodingTypeDropdownValuesRef}
                        index={index}
                        setValueChanged={setEncodingTypeChange}
                      />
                    </Span>
                    <Span isBottomRight>
                      {encodingTypeDropdownValuesRef.current[index] ===
                      'categorical' ? (
                        <EncodingOptions
                          encodingType={EncodingTypeEnum.Categorical}
                          index={index}
                          setValueChanged={setEncodingOptionChange}
                          valuesRef={encodingOptionsValuesRef}
                          key={encodingOptionsValuesRef.current[index]}
                        />
                      ) : (
                        <EncodingOptions
                          encodingType={EncodingTypeEnum.Digit}
                          index={index}
                          setValueChanged={setEncodingOptionChange}
                          valuesRef={encodingOptionsValuesRef}
                          key={encodingOptionsValuesRef.current[index]}
                        />
                      )}
                    </Span>
                  </Fragment>
                )
              return (
                <Fragment key={name_}>
                  <Span isPointer onClick={editName(index)}>
                    {isEditName[index] ? (
                      <Input
                        value={name[index]}
                        onOutsideClick={toggleEditName(index)}
                        onChange={changeName(index)}
                      />
                    ) : (
                      <span>{name[index]}</span>
                    )}
                  </Span>
                  <Span isCenter>
                    <Dropdown
                      items={includeDropdownItems}
                      valuesRef={includeDropdownValuesRef}
                      index={index}
                      setValueChanged={setIncludeChange}
                    />
                  </Span>
                  <Span isCenter>
                    <Dropdown
                      items={encodingTypeDropdownItems}
                      valuesRef={encodingTypeDropdownValuesRef}
                      index={index}
                      setValueChanged={setEncodingTypeChange}
                    />
                  </Span>
                  <Span>
                    {encodingTypeDropdownValuesRef.current[index] ===
                    'categorical' ? (
                      <EncodingOptions
                        encodingType={EncodingTypeEnum.Categorical}
                        index={index}
                        setValueChanged={setEncodingOptionChange}
                        valuesRef={encodingOptionsValuesRef}
                        key={encodingOptionsValuesRef.current[index]}
                      />
                    ) : (
                      <EncodingOptions
                        encodingType={EncodingTypeEnum.Digit}
                        index={index}
                        setValueChanged={setEncodingOptionChange}
                        valuesRef={encodingOptionsValuesRef}
                        key={encodingOptionsValuesRef.current[index]}
                      />
                    )}
                  </Span>
                </Fragment>
              )
            })}
          </EditTable>
        </>
      )
    }
    return (
      <>
        <FirstInARow>
          <CSVReader onFileLoaded={onFileLoaded} />
          <button type="button" onClick={showEditView}>
            edit view
          </button>
        </FirstInARow>
        <TableContainer>
          <Table
            numberOfColumns={columnIsShown?.reduce((acc, value) => {
              if (value) return ++acc
              return acc
            }, 0)}
          >
            {data.map((row, i) =>
              row.map((cell, j) => {
                if (columnIsShown[j])
                  return <Span key={`${i}_${j}`}>{cell}</Span>
                return null
              })
            )}
          </Table>
        </TableContainer>
      </>
    )
  }

  return (
    <ThemeProvider>
      <Wrapper>{getContent()}</Wrapper>
    </ThemeProvider>
  )
}

export default App

/**
 * some basic styles
 */
const Wrapper = styled.div`
  font-family: sans-serif;
  ${({ theme }): string => `
background-color:${theme.colors.offwhite};
color:${theme.colors.darkblue};
`}
`

interface ITable {
  numberOfColumns: number | undefined
}

const Table = styled.div<ITable>`
  display: grid;
  width: fit-content;
  ${({ theme }): string => `
border-top:1px solid ${theme.colors.darkblue};
border-right:1px solid ${theme.colors.darkblue};
`}
  ${({ numberOfColumns }): string => `
${
  numberOfColumns ? `grid-template-columns:repeat(${numberOfColumns},1fr);` : ''
}
`}
`

interface ISpan {
  isTopLeft?: boolean
  isBottomLeft?: boolean
  isBottomRight?: boolean
  isPointer?: boolean
  isCenter?: boolean
}

const Span = styled.div<ISpan>`
  padding: 8px 4px;
  ${({
    theme,
    isBottomLeft,
    isBottomRight,
    isTopLeft,
    isPointer,
    isCenter,
  }): string => `
border-left:1px solid ${theme.colors.darkblue};
border-bottom:1px solid ${theme.colors.darkblue};
${isBottomLeft ? 'border-bottom-left-radius:5px;' : ''}
${isBottomRight ? 'border-bottom-right-radius:5px;' : ''}
${isTopLeft ? 'border-top-left-radius:5px;' : ''}
${isPointer ? 'cursor:pointer;&:hover{text-decoration:underline;}' : ''}
${isCenter ? 'display:flex;justify-content:center;align-items:center;' : ''}
`}
`

const TableContainer = styled.div`
  overflow-x: scroll;
  height: ${TABLE_HEIGHT}px;
`

const FirstInARow = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const EditTable = styled.div`
  display: grid;
  border-radius: 5px;
  width: fit-content;
  grid-template-columns: repeat(${editTableColumnNames.length}, 1fr);
  ${({ theme }) => `
border-top:1px solid ${theme.colors.darkblue};
border-right:1px solid ${theme.colors.darkblue};
`}
`

const Button = styled.button`
  margin-bottom: 10px;
`

const Input = styled(I)`
  /*height:30px;*/
  border-radius: 5px;
  padding: 10px 10px;
`

const Dropdown = styled(Dd)`
  margin: 5px;
  border: 2px solid blue;
  background-color: red;
  padding: 5px;
`
