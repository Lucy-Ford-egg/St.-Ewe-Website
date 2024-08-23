import {LiaBrushSolid } from "react-icons/lia"

export default {
  name: 'colorChoice',
  title: 'Color Choice',
  type: 'object',
  icon:LiaBrushSolid,
  options: {
	  collapsible: true,
	  collapsed: true,
  },
  fields: [
	{
  	type: 'color',
  	name: 'oneOffColor',
  	title: 'One-off color',
  	hidden: ({ parent, value }) => !value && !!parent?.designSystemColor,
	},
	{
  	type: 'reference',
  	name: 'designSystemColor',
  	to: { type: 'designSystemColor', title: 'Design system color' },
  	hidden: ({ parent, value }) => !value && !!parent?.oneOffColor,
	},
  ],
}