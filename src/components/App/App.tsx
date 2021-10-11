import styled from 'styled-components'
import { ThemeProvider } from '../providers'

const App = () => (
  <ThemeProvider>
    <Wrapper>hello</Wrapper>
  </ThemeProvider>
)

export default App

const Wrapper = styled.div`
  font-family: sans-serif;
  ${({ theme }): string => `
background-color:${theme.colors.offwhite};
color:${theme.colors.darkblue};
`}
`
