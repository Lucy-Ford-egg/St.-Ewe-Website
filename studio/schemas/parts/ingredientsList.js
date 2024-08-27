import { defineType } from 'sanity'

export default defineType({
    name: "ingredientsList",
    title: "Ingredients",
    type: "array",
    of: [
      {type: "ingredientItem"}
    ],
    validation: (rule) => rule.required(),   
});