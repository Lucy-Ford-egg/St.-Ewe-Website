import React from "react"
import { LiaQuestionCircle } from "react-icons/lia"

export const FaqsMenu = S => S.listItem()
	.title(`FAQ's`)
	.icon(LiaQuestionCircle)
	.child(
		S.documentTypeList('faqs')
			.title(`FAQ`)
			.child((id) =>
              S.document().schemaType('faqs').documentId(id)
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}])
	)