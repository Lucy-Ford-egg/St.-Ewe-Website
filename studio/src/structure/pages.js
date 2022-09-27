import S from '@sanity/desk-tool/structure-builder'
import PreviewIFrame from '../../src/components/previewIFrame'

import { MdMenu } from 'react-icons/md'

export default S.listItem()
  .title('Pages')
  .schemaType('page')
  .child(
    S.documentList('page')
      .title('Pages')
      .menuItems(S.documentTypeList('page').getMenuItems())
      .filter('_type == "page" && _id != "frontpage"')
  )
// .child(
//   S.list()
//     .title('Pages')
//     .items([
//       // S.listItem()
//       //   .title('Navigation Menus')
//       //   .icon(MdMenu)
//       //   .schemaType('navigationMenu')
//       //   .child(S.documentTypeList('navigationMenu').title('Navigation Menus')),

//       // S.listItem()
//       //   .title('Pages')
//       //   .schemaType('page')
//       //   .child(
//       //     S.documentList('page')
//       //       .title('Pages')
//       //       .menuItems(S.documentTypeList('page').getMenuItems())
//       //       .filter('_type == "page" && _id != "frontpage"')
//       //   ),
//     ])
// )
