import React from 'react';
import { defineField, defineType } from 'sanity'
import { LiaFile } from 'react-icons/lia'
// Optional: import Rule from '@sanity/types' if needed

export default defineType({
  name: 'embedSection',
  type: 'object',
  title: 'Embed Section',
  fields: [
    defineField({
        title: 'Script Url',
        name: 'scriptTag',
        type: 'url',
        description: 'Add script tag',
      }),
      defineField({
        name: 'embedCode',
        type: 'code',
        title: 'Embed Code',
      }),
    defineField({
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
    }),
    defineField({
      name: 'verticalSpace',
      type: 'verticalSpace',
      title: 'Set the space required between sections',
    }),
    defineField({
        name: 'containerWidth',
        type: 'containerWidth',
        title: 'Set the container width of the content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'caseStudies',
      backgroundColour: 'backgroundColour',
    },
    prepare(selection) {
      const { title, subtitle, backgroundColour } = selection;
      const thumb = (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: backgroundColour?.value,
          }}
        >
          <LiaFile style={{ color: 'white' }} />
        </span>
      );
      return {
        title: title?.[0]?.children?.[0]?.text || 'Empty Title',
        subtitle: `Emmbed Section`,
        media: thumb, // Check if JSX is allowed or handle icons differently
      };
    },
  },
});
