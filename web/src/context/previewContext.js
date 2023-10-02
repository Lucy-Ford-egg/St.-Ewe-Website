// PreviewContext.jsx

import React, { createContext, useState } from "react"
import PreviewIndicator from "./previewIndicator"

// Set up the default context object
const defaultContext = {
  activePreview: "",
  setActivePreview: "",
  previewContextData: "",
  setPreviewContextData: "",
  previewIsLoading: "",
  setPreviewIsLoading: "",
}

// Create the PreviewContext using createContext
const PreviewContext = createContext(defaultContext)

// Define the PreviewProvider component
const PreviewProvider = ({ children }) => {
  // Set up state variables using useState
  const [activePreview, setActivePreview] = useState(false)
  const [previewIsLoading, setPreviewIsLoading] = useState(false)
  const [previewContextData, setPreviewContextData] = useState({
    previewContextDataset: "production" // Adapt if you have another default dataset name
  })
  const [previewValidationData, setPreviewValidationData] = useState([])
  const [isNewUnpublishedDoc, setIsNewUnpublishedDoc] = useState(false)

  // Render the PreviewProvider component
  return (
    <PreviewContext.Provider
      value={{
        activePreview,
        setActivePreview,
        previewContextData,
        setPreviewContextData,
        previewIsLoading,
        setPreviewIsLoading,
        previewValidationData,
        setPreviewValidationData,
        isNewUnpublishedDoc,
        setIsNewUnpublishedDoc
      }}
    >
      {children}
      {/* Render the PreviewIndicator component when activePreview is true */}
      {activePreview && <PreviewIndicator isLoading={previewIsLoading} />}
    </PreviewContext.Provider>
  )
}

export { PreviewContext, PreviewProvider }