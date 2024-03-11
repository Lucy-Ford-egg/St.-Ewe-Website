import {SiteSettingsMenu} from './siteSettingsMenu'
import {Views} from './views/preview'
import {
  MdCategory,
  MdOutlineMenu,
  MdOutlineChat,
  MdAutoStories,
  MdOutlineTagFaces,
  MdPerson,
  MdFormatQuote,
  MdAccessibilityNew,
} from 'react-icons/md'
// import {SEOPane} from 'sanity-plugin-seo-pane'

// const remoteURL = 'https://taylormoney.netlify.app' // ! For some reason env.vars aren't working process.env.SANITY_STUDIO_FRONTEND // either production or a specialized deploy branch for previews
// const localURL = 'https://localhost:8000' // local development port from Gatsby
// const previewUrl = window.location.hostname.includes('localhost') ? localURL : remoteURL

// const resolveProductionUrl = (doc) => {
//   console.log(`RPU - ${previewUrl}`)
//   return previewUrl
// }

// S.view
// .component(SEOPane)
// .options({
//   // Retrieve the keywords and synonyms at the given dot-notated strings
//   keywords: `seo.keywords`,
//   synonyms: `seo.synonyms`,
// url: () => resolveProductionUrl(process.env.SANITY_STUDIO_PRODUCTION_PREVIEW_URL || 'http://localhost:8000'),
//   url: (doc) => resolveProductionUrl(doc),
// })
// .title('SEO')

export const deskStructure = (S, context) => {
  return (
    // S.view
    //   .component(SEOPane)
    //   .options({
    //     // Retrieve the keywords and synonyms at the given dot-notated strings
    //     keywords: `seo.keywords`,
    //     synonyms: `seo.synonyms`,
    //     url: () =>
    //       resolveProductionUrl(
    //         process.env.SANITY_STUDIO_PRODUCTION_PREVIEW_URL || 'http://localhost:8000',
    //       ),
    //     url: (doc) => resolveProductionUrl(doc),
    //   })
    //   .title('SEO'),
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
              .child(
                (id) => S.document().schemaType('post').documentId(id),
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
              .child(
                (id) => S.document().schemaType('page').documentId(id),
                //.views(Views(S, context))
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),

        S.listItem()
          .title('Case Studies')
          .icon(MdPerson)
          .child(
            S.documentTypeList('caseStudy')
              .title('Case Studies')
              .child(
                (id) => S.document().schemaType('caseStudy').documentId(id),
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
          .title('Services')
          .icon(MdCategory)
          .child(
            S.documentTypeList('services')
              .title('Services')
              .child(
                (id) => S.document().schemaType('services').documentId(id),
                //.views(Views(S, context)),
              )
              .defaultOrdering([{field: 'title', direction: 'asc'}]),
          ),
      ])
  )
}
