export const renderTaxonomies = (categories) => {

    const taxonomies = categories?.map((tax, i) => {
      return (
        tax.name
      )
    })
    return (
      taxonomies && taxonomies.join(', ')
    )
  }

export const renderLocation = (location) => {
  debugger
    return `${location.name} - ${location.country}`
  }