import {SiteSettingsMenu} from './siteSettingsMenu'
// import {Views} from './views/preview'
import {
  LiaShapesSolid,
  LiaBarsSolid,
  LiaNewspaper,
  LiaBookOpenSolid,
  LiaSmile,
  LiaUtensilsSolid,
  LiaQuoteLeftSolid,
  LiaMaleSolid,
  LiaBriefcaseSolid,
  LiaQuestionCircle,
  LiaCrosshairsSolid,
  LiaCarrotSolid,
} from 'react-icons/lia'

export const deskStructure = (S, context) => {
  return S.list()
    .title('Site Content')
    .items([
      SiteSettingsMenu(S),
      S.divider(),

      S.listItem()
        .title('Navigation')
        .icon(LiaBarsSolid)
        .child(
          S.documentTypeList('navigation')
            .title('Navigation')
            .child((id) => S.document().schemaType('navigation').documentId(id))
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Footer Content')
        .schemaType('footerContent')
        .icon(LiaBarsSolid)
        .child(
          (documentId) =>
            S.document().title('Footer Content').documentId(documentId).schemaType('footerContent'),
          ...S.documentTypeListItems().filter(
            (listItem) => !['footerContent'].includes(listItem.getId()),
          ),
        ),
      S.divider(),
      S.listItem()
        .title('Hotspots')
        .icon(LiaCrosshairsSolid)
        .child(
          S.documentTypeList('hotspots')
            .title('Hotspots')
            .child((id) => S.document().schemaType('hotspots').documentId(id)),
          // .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.divider(),

      S.listItem()
        .title('Posts')
        .icon(LiaNewspaper)
        .child(
          S.documentTypeList('post')
            .title('Posts')
            .child((id) => S.document().schemaType('post').documentId(id))
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Pages')
        .icon(LiaBookOpenSolid)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .child((id) => S.document().schemaType('page').documentId(id))
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),

      S.listItem()
        .title("FAQ's")
        .icon(LiaQuestionCircle)
        .child(
          S.documentTypeList('faqs')
            .title("FAQ's")
            .child((id) => S.document().schemaType('faqs').documentId(id))
            .defaultOrdering([{field: 'question', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Careers')
        .icon(LiaBriefcaseSolid)
        .child(
          S.documentTypeList('careers')
            .title('Careers')
            .child((id) => S.document().schemaType('careers').documentId(id))
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Recipes')
        .icon(LiaUtensilsSolid)
        .child(
          S.documentTypeList('recipes')
            .title('Recipe')
            .child(
              (id) => S.document().schemaType('recipes').documentId(id),
              //.views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Ingredients')
        .icon(LiaCarrotSolid)
        .child(
          S.documentTypeList('ingredient')
            .title('Ingredients')
            .child(
              (id) => S.document().schemaType('ingredient').documentId(id),
              //.views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Quotes')
        .icon(LiaQuoteLeftSolid)
        .child(
          S.documentTypeList('quote')
            .title('Quotes')
            .child((id) => S.document().schemaType('quote').documentId(id))
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Team Members')
        .icon(LiaMaleSolid)
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .child(
              (id) => S.document().schemaType('teamMember').documentId(id),
              //.views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.divider(),

      S.listItem()
        .title('Authors')
        .icon(LiaSmile)
        .child(
          S.documentTypeList('author')
            .title('Authors')
            .child(
              (id) => S.document().schemaType('author').documentId(id),
              //.views(Views(S, context)),
            )
            .defaultOrdering([{field: 'name', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Post Categories')
        .icon(LiaShapesSolid)
        .child(
          S.documentTypeList('categories')
            .title('Post Categories')
            .child(
              (id) => S.document().schemaType('categories').documentId(id),
              //.views(Views(S, context)),
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Recipes Categories')
        .icon(LiaShapesSolid)
        .child(
          S.documentTypeList('recipesCategory')
            .title('Recipes Categories')
            .child(
              (id) => S.document().schemaType('recipesCategory').documentId(id),
              //.views(Views(S, context)),
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
    ])
}
