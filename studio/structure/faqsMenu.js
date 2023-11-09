import React from "react"
import { MdOutlineQuestionAnswer } from "react-icons/md"

export const FaqsMenu = S => S.listItem()
	.title(`FAQ's`)
	.icon(MdOutlineQuestionAnswer)
	.child(
		S.documentTypeList('faqs')
			.title(`FAQ`)
			.child((id) =>
              S.document().schemaType('faqs').documentId(id)
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}])
	)