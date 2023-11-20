//ReferenceSelect.js

import React, { useEffect, useState } from 'react'
import { Card, Flex, Checkbox, Box, Text, Stack } from '@sanity/ui'
import { set, unset} from 'sanity'
// import { useId } from "@reach/auto-id" 
import { client } from '../client'

const CategorySelect = ((props) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      await client
        .fetch(`*[_type == 'categories']{
          _id,
          title
        }`)
        .then(setCategories)
    }

    fetchCategories()
  }, []) 

  // const { 
  //   type,         // Schema information
  //   value,        // Current field value
  //   readOnly,     // Boolean if field is not editable
  //   markers,      // Markers including validation rules
  //   presence,     // Presence information for collaborative avatars
  //   compareValue, // Value to check for "edited" functionality
  //   onFocus,      // Method to handle focus state
  //   onBlur,       // Method to handle blur state  
  //   onChange,      // Method to handle patch events,
  // } = props

  // const handleClick = React.useCallback(
  //   (e) => {
  //     const inputValue = {
  //       _key: e.target.value.slice(0, 10),
  //       _type: 'reference',
  //       _ref: e.target.value
  //     }
      
  //     if(value) {
  //       if(value.some(country => country._ref === e.target.value._ref)) {
         
  //         onChange(e.currentTarget.value ? set(e.currentTarget.value.filter(item => item._ref != e.target.value._ref)) : unset())
  //       } else {
  //         onChange(e.currentTarget.value ? set([...value, inputValue]) : unset())
  //       }
  //     } else {
  //       onChange(e.currentTarget.value ? (set([inputValue])) : unset())
  //     }
  //   },
  //   [value]
  // )

  // const inputId = useId()

  // !

  const {onChange, value = '', elementProps } = props
  const handleChange = useCallback(
    (event) =>
      onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset()),
    [onChange]
  )

	return (

   

    <Stack space={3}>
      <TextInput {...elementProps} onChange={handleChange} value={value} />
      <Text size={1}>Characters: {value?.length || 0}</Text>
    </Stack>

    // <Stack space={3}>
    //   {
    //     categories.map(category => (
    //       <Card padding={2}>
    //         <Flex align="center">
    //           <Checkbox 
    //             id="checkbox" 
    //             style={{display: 'block'}} 
    //             //onClick={handleClick}
    //             value={category._id}
    //             checked={value ? value.some(item => item._ref === category._id) : false}
    //           />
    //           <Box flex={1} paddingLeft={3}>
    //             <Text>
    //               <label htmlFor="checkbox">{category.title}</label>
    //             </Text>
    //           </Box>
    //         </Flex>
    //       </Card>
    //     ))
    //   }
    // </Stack>
	)
})

export default CategorySelect
