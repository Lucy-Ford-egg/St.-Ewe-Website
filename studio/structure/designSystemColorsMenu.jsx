import React from "react"
import { HiOutlineColorSwatch } from "react-icons/hi"

const Icon = () => (
  <HiOutlineColorSwatch
  	style={{
    	fontSize: "2rem",
    	strokeWidth: "10px !important",
    	color: "#FFFFFFF",
  	}}
  	strokeWidth={1}
  />
)

export const DesignSystemColorsMenu = S => S.listItem()
  .title("Brand Colours")
  .id("designSystemColors")
  .icon(Icon)
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