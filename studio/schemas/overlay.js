import {defineType} from 'sanity'

// We need will extend and import these in the custom input component later
export const OPACITY = [
  {title: '10%', value: '0.1'},
  {title: '20%', value: '0.2'},
  {title: '30%', value: '0.3'},
  {title: '40%', value: '0.4'},
  {title: '50%', value: '0.5'},
]

export default defineType({
  name: 'overlay',
  title: 'Overlay',
  type: 'string',
  options: {
    list: OPACITY.map(({title, value}) => ({title, value})),
    layout: 'radio',
    direction: 'horizontal'
  },
  initialValue: '0.1',
  
})