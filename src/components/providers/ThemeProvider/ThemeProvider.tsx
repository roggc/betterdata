import { ThemeProvider as ThP} from "styled-components";

const theme={
    colors:{
        purple:'#635bff',
        lightblue:'#00d4ff',
        darkblue:'#0a2540',
        grey:'#666d77',
        offwhite:'#f6f9fc'
    }
}

export const ThemeProvider:React.FC=({children})=>{
return <ThP theme={theme}>{children}</ThP>
}