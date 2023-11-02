import {defineType} from 'sanity'

// We need will extend and import these in the custom input component later
export const OPACITY = [
  {title: '10%', value: '10'},
  {title: '20%', value: '20'},
  {title: '30%', value: '30'},
  {title: '40%', value: '40'},
  {title: '50%', value: '50'},
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
  initialValue: '10',
  
})