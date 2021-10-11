import styled from 'styled-components'
import { ThemeProvider } from '../providers'
import { useState } from 'react'
import CSVReader from 'react-csv-reader'

const FIRST_OR_DEFAULT=0
const TABLE_HEIGHT=600

const App = () => {
  const [numberOfColumns,setNumberOfColumns]=useState<number|undefined>(undefined)
  const [data,setData]=useState<any[][]>([])

  const onFileLoaded=(data:any[][])=>{
    setNumberOfColumns(data[FIRST_OR_DEFAULT].length)
    setData(data.slice(0,30))
  }

  return (
    <ThemeProvider>
      <Wrapper>
        <CSVReader onFileLoaded={onFileLoaded} />
        <TableContainer>
        <Table numberOfColumns={numberOfColumns}>
          {data.map((row,i)=>row.map((cell,j)=><Span key={`${i}_${j}`}>{cell}</Span>))}
        </Table>
        </TableContainer>
      </Wrapper>
    </ThemeProvider>
  )
}

export default App

const Wrapper = styled.div`
  font-family: sans-serif;
  ${({ theme }): string => `
background-color:${theme.colors.offwhite};
color:${theme.colors.darkblue};
`}
`

interface ITable{
  numberOfColumns:number|undefined
}

const Table=styled.div<ITable>`
display:grid;
width:fit-content;
${({theme}):string=>`
border-top:1px solid ${theme.colors.darkblue};
border-right:1px solid ${theme.colors.darkblue};
`}
${({numberOfColumns}):string=>`
${numberOfColumns?`grid-template-columns:repeat(${numberOfColumns},1fr);`:''}
`}
`

const Span=styled.span`
padding:8px 4px;
${({theme}):string=>`
border-left:1px solid ${theme.colors.darkblue};
border-bottom:1px solid ${theme.colors.darkblue};
`}
`

const TableContainer=styled.div`
overflow-x:scroll;
height:${TABLE_HEIGHT}px;
`
