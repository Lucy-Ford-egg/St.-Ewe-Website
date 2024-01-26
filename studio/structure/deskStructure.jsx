
// import {Views} from './views/preview'

import {DesignSystemColorsMenu} from './designSystemColorsMenu'
import {FaqsMenu} from './faqsMenu'
import {SiteSettingsMenu} from './siteSettingsMenu'
import {
  MdCategory,
  MdHolidayVillage,
  MdOutlineMenu,
  MdOutlineChat,
  MdAutoStories,
  MdOutlineTagFaces,
} from 'react-icons/md'


export const deskStructure = (S, context) => {
  return (
  S.list()
    .title('Site Content')
    .items([
      SiteSettingsMenu(S),
      DesignSystemColorsMenu(S),
      FaqsMenu(S),
      S.divider(),

      S.listItem()
        .title('Navigation')
        .icon(MdOutlineMenu)
        .child(
          S.documentTypeList('navigation')
            .title('Navigation')
            .child((id) =>
              S.document().schemaType('navigation').documentId(id)
              //.views(Views(S, context)),
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
            .child((id) => S.document().schemaType('post').documentId(id)
            //.views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Pages')
        .icon(MdAutoStories)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .child((id) => S.document().schemaType('page').documentId(id)
            //.views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Units')
        .icon(MdHolidayVillage)
        .child(
          S.documentTypeList('unit')
            .title('Units')
            .child((id) => S.document().schemaType('unit').documentId(id)
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
            .child((id) =>
              S.document().schemaType('author').documentId(id)
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
            .child((id) =>
              S.document().schemaType('categories').documentId(id)
              //.views(Views(S, context)),
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
    ])
  )
}
