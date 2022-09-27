import S from '@sanity/desk-tool/structure-builder'
import {
  FiHome as BlogIcon,
  FiCheck as ApprovedIcon,
  FiEye as ReviewIcon,
  FiX as RejectedIcon,
  FiGrid as AllIcon,
  FiSmile as AuthorIcon,
} from "react-icons/fi"

import PreviewIFrame from '../../src/components/previewIFrame'

export const icons = {
  BlogIcon,
  ApprovedIcon,
  ReviewIcon,
  RejectedIcon,
  AllIcon,
}

const places = S.listItem()
  .title('Places')
  .icon(BlogIcon)
  .child(
    S.list()
      .title('/places')
      .items([
        S.listItem()
          .title('Published places')
          .schemaType('post')
          .icon(BlogIcon)
          .child(
            S.documentList('place')
              .title('Published places')
              .menuItems(S.documentTypeList('post').getMenuItems())
              // Only show posts with publish date earlier than now and that is not drafts
              .filter('_type == "place" && publishedAt < now() && !(_id in path("drafts.**"))')
              .child((documentId) =>
                S.document()
                  .documentId(documentId)
                  .schemaType('place')
                  .views([S.view.form(), PreviewIFrame()])
              )
          ),
        S.documentTypeListItem('place').title('All places').icon(AllIcon),
        S.listItem()
          .title('Places by category')
          .child(
            // List out all categories
            S.documentTypeList('category')
              .title('Places by category')
              .child(catId =>
                // List out project documents where the _id for the selected
                // category appear as a _ref in the project’s categories array
                S.documentList()
                  .schemaType('place')
                  .title('Places')
                  .filter(
                    '_type == "place" && $catId in categories[]._ref'
                  )
                  .params({ catId })
              )
        ),
        S.divider(),
        S.documentTypeListItem('author').title('Authors').icon(AuthorIcon),
        S.documentTypeListItem('category').title('Categories')
      ])
  )

export default places
