import { defineType, defineField } from 'sanity'
import { LiaCarrotSolid,  LiaUtensilsSolid } from "react-icons/lia";

export default defineType({
        title: "Ingredient",
        name: "ingredientItem",
        type: "object",
        fields: [
          defineField({
            title: "Ingredient",
            name: "ingredient",
            type: "reference",
            to: [{ type: "ingredients"}, {type: "recipes" }],
          }),
          defineField({
            name: "wholeNumber",
            title: "Whole Numbers",
            type: "number",
          }),
          defineField({
            name: "fraction",
            title: "Fraction Amount",
            type: "string",
            options: {
              list: ["1/2", "1/3", "1/4", "3/4", "2/3"],
            },
          }),
          defineField({
            name: "unit",
            title: "Unit",
            type: "string",
            options: {
              list: ["grams", "cup", "Tbsp.", "tsp.", "bunch", "handful", "pinch", "glug"],
            },
          }),
          defineField({
            name: "preparation",
            title: "Preparation",
            type: "string",
            options: {
              list: ["Roughly Chopped", "Chopped", "Finely Chopped", "Finely Chopped or Sliced", "Sliced",  "Shredded", "Grated", "Crushed", "Drained & Rinsed", "Drained & Finely Chopped", "Juice of", "to taste"],
            },
          }),
          defineField({
            name: "optional",
            title: "Optional",
            type: "boolean",
          }),
        ],
        preview: {
            select: {
              title: "ingredient.title",
              name: "ingredient.title",
              media: "ingredient.image",
              wholeNumber: "wholeNumber",
              fraction: "fraction",
              unit: "unit",
              preparation: "preparation",
              ingredient: "ingredient",
              optional: "optional"
            },
            prepare({
              title,
              media,
              wholeNumber,
              fraction,
              unit,
              preparation,
              ingredient,
              optional,
            }) {

              return {
                title: `${title}`,
                subtitle: `${wholeNumber ? wholeNumber : ''} ${fraction ? fraction : ''} ${unit ? unit : ''} ${preparation ? preparation: ''} ${optional === true ? '(Optional)' : ''}`,
                media,
                icon:  ingredient?._type === "ingredients" ? LiaCarrotSolid :  LiaUtensilsSolid, 
              };
            },
          },
      });