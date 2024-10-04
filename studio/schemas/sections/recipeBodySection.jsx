import React from 'react';
import { defineField, defineType } from 'sanity'
import { LiaFile } from 'react-icons/lia'
// Optional: import Rule from '@sanity/types' if needed

export default defineType({
  name: 'recipeBodySection',
  type: 'object',
  title: 'Recipe Body Section',
  description: 'When you place this section on a recipe page, the data is automatically pulled in from that particualr recipe. Being part of the page builder just allows you to arrange on the page.',
  fields: [
    defineField({
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
    }),
    defineField({
      name: 'mirror',
      type: 'boolean',
      title: 'Show Instructions on right',
    }),
    defineField({
      name: 'verticalSpace',
      type: 'verticalSpace',
      title: 'Set the space required between sections',
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
        subtitle: `${
          subtitle && subtitle?.length > 0 ? 'Curated Recipe' : 'All Recipes'
        } | Recipe Body Section`,
        media: thumb, // Check if JSX is allowed or handle icons differently
      };
    },
  },
});
