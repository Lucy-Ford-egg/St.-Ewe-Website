import React from 'react';
import { defineField, defineType } from 'sanity'
import { LiaFile } from 'react-icons/lia'
// Optional: import Rule from '@sanity/types' if needed

export default defineType({
  name: 'recipesSection',
  type: 'object',
  title: 'Recipes Section',
  fields: [
    defineField({
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
    }),
    defineField({
      name: 'showRecipesArchive',
      type: 'showRecipesArchive',
      title: 'Show Recipe Archive',
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
        title: `${
          subtitle && subtitle?.length > 0 ? 'Curated Recipe' : 'All Recipes'
        }`,
        subtitle: `Recipes Section`,
        media: thumb, // Check if JSX is allowed or handle icons differently
      };
    },
  },
});
