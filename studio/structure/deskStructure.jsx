import {SiteSettingsMenu} from './siteSettingsMenu'
// import {Views} from './views/preview'
import {
  MdCategory,
  MdOutlineMenu,
  MdOutlineChat,
  MdAutoStories,
  MdOutlineTagFaces,
  MdKitchen,
  MdFormatQuote,
  MdAccessibilityNew,
} from 'react-icons/md'

export const deskStructure = (S, context) => {
  return (
    S.list()
      .title('Site Content')
      .items([
        SiteSettingsMenu(S),
        S.divider(),

        S.listItem()
          .title('Navigation')
          .icon(MdOutlineMenu)
          .child(
            S.documentTypeList('navigation')
              .title('Navigation')
              .child(
                (id) => S.document().schemaType('navigation').documentId(id),
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),
        S.divider(),
        S.listItem()
          .title('Posts')
          .icon(MdOutlineChat)
          .child(
            S.documentTypeList('post')
              .title('Posts')
              .child(
                (id) => S.document().schemaType('post').documentId(id),
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),

        S.listItem()
          .title('Pages')
          .icon(MdAutoStories)
          .child(
            S.documentTypeList('page')
              .title('Pages')
              .child(
                (id) => S.document().schemaType('page').documentId(id),
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),

        S.listItem()
          .title('Recipies')
          .icon(MdKitchen)
          .child(
            S.documentTypeList('recipies')
              .title('Recipies')
              .child(
                (id) => S.document().schemaType('recipies').documentId(id),
                //.views(Views(S, context))
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),

        S.listItem()
          .title('Quotes')
          .icon(MdFormatQuote)
          .child(
            S.documentTypeList('quote')
              .title('Quotes')
              .child(
                (id) => S.document().schemaType('quote').documentId(id),
                //.views(Views(S, context))
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),

        S.listItem()
          .title('Team Members')
          .icon(MdAccessibilityNew)
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
          .icon(MdOutlineTagFaces)
          .child(
            S.documentTypeList('author')
              .title('Authors')
              .child(
                (id) => S.document().schemaType('author').documentId(id),
                //.views(Views(S, context)),
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),
        S.divider(),
        S.listItem()
          .title('Post Categories')
          .icon(MdCategory)
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
          .title('Recipie Categories')
          .icon(MdCategory)
          .child(
            S.documentTypeList('services')
              .title('Recipie Categories')
              .child(
                (id) => S.document().schemaType('services').documentId(id),
                //.views(Views(S, context)),
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),
      ])
  )
}
