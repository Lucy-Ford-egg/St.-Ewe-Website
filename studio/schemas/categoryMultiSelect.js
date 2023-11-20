import { defineField, defineType } from 'sanity'
import CategorySelect from '../schemas/categorySelect'
// import { MdAddLink } from "react-icons/md";

export default defineType({
  name: 'categoryMultiSelect',
  title: 'Reference Categories',
  type: 'array',
  of: [
    { type: 'categories', title: 'Make a category page' }
  ],
  components: {
    input: CategorySelect,
  },
})
