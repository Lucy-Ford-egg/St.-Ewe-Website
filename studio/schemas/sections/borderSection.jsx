import { defineField, defineType } from 'sanity'
import {LiaWaveSquareSolid} from "react-icons/lia"

export default defineType({
  name: "borderSection",
  type: "object",
  title: "Border Section",
  fields: [
    defineField({
        title: "Border Type",
        name: "borderType",
        type: "string",
        options: {
          list: ["Type 2", "Type 3", "Type 6"],
        },
      }),
      defineField({
        title: "Border Direction",
        name: "borderDirection",
        type: "string",
        options: {
          list: ["Top", "Bottom"],
        },
      }),
      defineField({
        title: "Flip Horizontally",
        name: "mirror",
        type: "boolean",
      }),
    defineField({
        title: 'Joining Colour',
      name: 'joiningColour',
      type: 'simplerColor',
    }),
    defineField({
        title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add some textual content. Optional'
    }),
  ],
  preview: {
    select: {
      borderType: 'borderType',
      backgroundColour: 'backgroundColour',
      joiningColour: 'joiningColour',
      borderDirection: 'borderDirection',
    },
    prepare(selection) {
      const { borderType, joiningColour, backgroundColour,  borderDirection  } = selection

      const thumb = <span style={{position: 'relative', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
        <span style={{backgroundColor: joiningColour?.value, display: 'flex', width: '100%', flexDirection: 'column', flexBasis: '50%', height: '50%'}}></span>
        <span style={{backgroundColor:  backgroundColour?.value, display: 'flex', width: '100%', flexDirection: 'column', flexBasis: '50%', height: '50%'}}></span>
        <LiaWaveSquareSolid style={{backgroundColor: 'white', padding: 4, position: 'absolute', left:'50%', transform: 'translate(-50%)'}}/></span>

      return {
        title: borderType,
        subtitle: `Border ${borderDirection} Section `,
        media: thumb,
      }
    }
  },
})