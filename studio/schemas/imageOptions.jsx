import { defineField, defineType } from 'sanity'
import { MdOutlineImage } from "react-icons/md";


export default defineType({
  name: 'imageOptions',
  type: 'object',
  title: 'Image',
  icon: MdOutlineImage,
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mixBlendMode',
      type: 'string',
      title: 'Image Blend Options',
      options: {
        list: [
          {title: "Multiply", value: "multiply"},
          {title: "HardLight", value: "hard-light"},
          //{title: "Screen", value: "screen", description: "Removes original colour and applies a colour to the image"},
        ]
      },
    }),
  ],
});