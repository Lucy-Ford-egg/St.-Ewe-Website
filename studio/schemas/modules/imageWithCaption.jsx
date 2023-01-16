import { defineField, defineType } from 'sanity'
import sizes from '../sizes'

// Render a div that wraps the default preview component
function MyPreviewComponent(props) {
  return (
    <div style={{border: '1px solid green'}}>
      {props.renderDefault(props)}
    </div>
  )
}

export default defineType({
  name: "imageWithCaption",
  type: "object",
  title: "Image w/caption Module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'imageSize',
      image: 'image'
    },
    prepare(selection) {
      const {title, subtitle, image} = selection
      return {
        title: `Image with caption module`,
        subtitle: `Image Size ${subtitle} - ${image.alt}`
      }
    }
  },
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      components: {
        preview: MyPreviewComponent, // Add custom preview component
      }, 
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption'
        })
      ]
    }),
    defineField({
      title: 'Image Size',
      name: 'imageSize',
      type: 'string',
      options: {
        list: [
          ...sizes
        ],
      },
      
      validation: (rule) => rule.required(),
    }),
    defineField({
        title: 'Make Portrait',
        name: 'portrait',
        type: 'boolean',
        initialValue: false,
    }),
    defineField({
      name: 'editorTitle',
      type: 'string',
      title: 'Editor Title',
      description: 'Add a title to make it easier to know which sections are which.'
    }),
  ]
})