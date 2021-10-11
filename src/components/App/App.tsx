import styled from 'styled-components'
import { ThemeProvider } from '../providers'
import { useEffect, useState, useRef } from 'react'
import CSVReader from 'react-csv-reader'
import Input from '../Input'

const FIRST_OR_DEFAULT = 0
const TABLE_HEIGHT = 600

const App = () => {
  const [numberOfColumns, setNumberOfColumns] = useState<number | undefined>(
    undefined
  )
  const [data, setData] = useState<any[][]>([])
  const [isEditView, setIsEditView] = useState(false)
  const [isEditName, setIsEditName] = useState(
    data[FIRST_OR_DEFAULT]?.map((name) => false)
  )
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    setIsEditName(data[FIRST_OR_DEFAULT]?.map((name) => false))
  }, [data])

  const onFileLoaded = (data: any[][]) => {
    setNumberOfColumns(data[FIRST_OR_DEFAULT].length)
    setData(data.slice(0, 30))
  }

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

  const getContent = () => {
    if (isEditView) {
      return (
        <>
          <Button onClick={showDataTable} type="button">
            done
          </Button>
          <EditTable>
            {data[0].map((name, index, array) => {
              if (index === 0)
                return (
                  <Span
                    key={name}
                    isTopLeft
                    isPointer
                    onClick={editName(index)}
                  >
                    {isEditName[index] ? (
                      <Input
                        value={name}
                        onOutsideClick={toggleEditName(index)}
                      />
                    ) : (
                      <span>{name}</span>
                    )}
                  </Span>
                )
              if (index === array.length - 1)
                return (
                  <Span
                    key={name}
                    isBottomLeft
                    isBottomRight
                    isPointer
                    onClick={editName(index)}
                  >
                    {isEditName[index] ? (
                      <Input
                        value={name}
                        onOutsideClick={toggleEditName(index)}
                      />
                    ) : (
                      <span>{name}</span>
                    )}
                  </Span>
                )
              return (
                <Span key={name} isPointer onClick={editName(index)}>
                  {isEditName[index] ? (
                    <Input
                      value={name}
                      onOutsideClick={toggleEditName(index)}
                    />
                  ) : (
                    <span>{name}</span>
                  )}
                </Span>
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
          <Table numberOfColumns={numberOfColumns}>
            {data.map((row, i) =>
              row.map((cell, j) => <Span key={`${i}_${j}`}>{cell}</Span>)
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
}

const Span = styled.div<ISpan>`
  padding: 8px 4px;
  ${({ theme, isBottomLeft, isBottomRight, isTopLeft, isPointer }): string => `
border-left:1px solid ${theme.colors.darkblue};
border-bottom:1px solid ${theme.colors.darkblue};
${isBottomLeft ? 'border-bottom-left-radius:5px;' : ''}
${isBottomRight ? 'border-bottom-right-radius:5px;' : ''}
${isTopLeft ? 'border-top-left-radius:5px;' : ''}
${isPointer ? 'cursor:pointer;&:hover{text-decoration:underline;}' : ''}
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
  grid-template-columns: 1fr;
  ${({ theme }) => `
border-top:1px solid ${theme.colors.darkblue};
border-right:1px solid ${theme.colors.darkblue};
`}
`

const Button = styled.button`
  margin-bottom: 10px;
`
