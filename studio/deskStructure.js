import S from '@sanity/desk-tool/structure-builder'
import { MdMenu } from "react-icons/md"
import { FiBrowser as PageIcon, FiHome, FiSettings } from "react-icons/fi"
import blog from './src/structure/blog'
import places from './src/structure/places'
import pages from './src/structure/pages'
import PreviewIFrame from './src/components/previewIFrame'

const hiddenDocTypes = (listItem) =>
  !['route', 'navigationMenu', 'post', 'page', 'siteSettings', 'author', 'category'].includes(
    listItem.getId()
  )

export default () =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem()
        .schemaType('siteSettings')
        .title('Site settings')
        .icon(FiSettings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .views([S.view.form(), PreviewIFrame()])
        ),
      // S.documentListItem()
      //   .title('Frontpage')
      //   .schemaType('page')
      //   .icon(GoHome)
      //   .child(
      //     S.document()
      //       .schemaType('page')
      //       .documentId('frontpage')
      //       .views([S.view.form(), PreviewIFrame()])
      //   ),
      blog,
      places,
      pages,
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
