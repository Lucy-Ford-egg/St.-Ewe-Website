import { defineField, defineType } from 'sanity'

export default defineType({
  name: "instagramUrl",
  type: "object",
  title: "Instagram Url",
  fields: [
    defineField({
      title: "Title",
      name: "url",
      type: "url",
      description: "Visit an Instagram post in a browser and copy the URL."
    })],   
})