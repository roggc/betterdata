import {render} from '@testing-library/react'
import Dropdown from '.'

it('renders',()=>{
    render(<Dropdown items={[]} valuesRef={{current:[]}} index={0} setValueChanged={()=>{}} />)
})