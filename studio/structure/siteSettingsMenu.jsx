import React from "react"
import { LiaCogsSolid } from "react-icons/lia"


const Icon = () => (
  <LiaCogsSolid/>
)

export const SiteSettingsMenu = S => 
 S.listItem()
  .title('Site Settings')
  .schemaType('siteSettings')
  .icon(Icon)
  .child(documentId =>
    S.document().documentId(documentId).schemaType("siteSettings"), 
    ...S.documentTypeListItems().filter(listItem => !['siteSettings'].includes(listItem.getId()))
  ) 
	