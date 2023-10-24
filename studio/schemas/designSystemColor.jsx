export default {
  name: 'designSystemColor',
  title: 'Design system color',
  type: 'document',
  fields: [
	  { title: 'Title', name: 'title', type: 'string' },
	  { title: 'Color', name: 'color', type: 'color' },
  ],
  preview: {
	select: {
  	title: 'title',
  	color: 'color',
	},
	prepare(selection) {
  	const { color, title } = selection

  	return {
    	title: title,
    	media: (
      	<span
        	style={{
          	border: 'solid',
          	borderWidth: '0.5px',
          	borderColor: 'white',
          	width: '2rem',
          	height: '2rem',
          	borderRadius: '100%',
          	backgroundColor: color.hex,
        	}}
      	/>
    	),
  	}
	},
  },
}