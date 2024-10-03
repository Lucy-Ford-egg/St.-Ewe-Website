import { graphql } from "gatsby"

export const footerLinks = graphql`
fragment FooterMenuFragment on SanityFooterMenu {
  title
  links {
    _key
    text
    inline
    link {
      external
      internal {
        ... on SanityPage {
          id
          _type
          slug {
            current
          } 
        }
        ... on SanityPost {
          id
          slug {
            current
            _type
          }
          categories {
            name
            slug{
              current
            }
          }
        }
      }
    }
  }
}
`

export const linksQuery = graphql`
fragment LinksFragment on SanityLinkDefined {
    links {
        link {
            external
              internal {
                ... on SanityPage {
                  id
                  _type
                  slug {
                    current
                  } 
                }
                ... on SanityPost {
                    id
                    slug {
                      current
                      _type
                    }
                    categories {
                      name
                      slug{
                        current
                      }
                    }
                }
            }
        }
        text
    }
}

fragment LinkFragment on SanityLinkDefined {
    link {
        external
          internal {
            ... on SanityPage {
              id
              _type
              slug {
                current
              } 
            }
            ... on SanityPost {
                id
                slug {
                  current
                  _type
                }
                categories {
                  name
                  slug{
                    current
                  }
                }
            }
        }
    }
    text
}
fragment JustLinkFragment on SanityLink {
  external
  internal {
    ... on SanityPage {
      id
      _type
      slug {
        current
      } 
    }
    ... on SanityPost {
        id
        slug {
          current
          _type
        }
        categories {
          name
          slug{
            current
          }
        }
    }
  }          
}
`
