import React from "react"
import { MdOutlineColorLens } from "react-icons/md"

export const DesignSystemColorsMenu = S => S.listItem()
  .title("Brand Colours")
  .id("designSystemColors")
  .icon(MdOutlineColorLens)
  .child(
  	S.documentTypeList("designSystemColor")
    	.title("Design System Colors")
    	.menuItems(S.documentTypeList("designSystemColor").getMenuItems())
    	.filter("_type == $type")
    	.params({ type: "designSystemColor" })
    	.child(documentId =>
      	S.document().documentId(documentId).schemaType("designSystemColor")
    	)
  )