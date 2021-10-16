import {render} from '@testing-library/react'
import EncodingOptions from '.'

it('renders',()=>{
    render(<EncodingOptions encodingType={0} valuesRef={{current:[]}} index={0} setValueChanged={()=>{}} />)
})