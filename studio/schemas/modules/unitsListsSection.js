import { defineField, defineType } from 'sanity'
import {MdOutlineHouse} from "react-icons/md"

export default defineType({
  name: "unitsListsSection",
  type: "object",
  title: "Unit Lists Section",
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Results Iframe Url',
      description: 'This field is just for reference.',
      readOnly: true,
      initialValue: 'https://bookings.gemapark.co.uk/park/searchresults.aspx?cid=xxx&amp;curid=1&amp;cul=en-GB&amp;ifr=ifrResults&amp;url=https%3a%2f%2fwww.yourwebsitehere.co.uk%2fsearch-results.html'
    }), 
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: `Display Search Results`,
        subtitle: `Units Lists Section`,
        media: media,
        icon: MdOutlineHouse
      }
    }
  },
})