import React from 'react'
// import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultTitleTemplate: titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
        twitterUsername
      }
    }
  }
`

const SEO = ({ title, titleTemplate, description, image, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const { defaultTitle, defaultTitleTemplate, defaultDescription, siteUrl, defaultImage, twitterUsername } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    titleTemplate: titleTemplate || defaultTitleTemplate,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`
  }

  return (
    <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}

      {/* Start Twitter specific meta */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" conent={seo.image} />}

    </Helmet>
  )
}

export default SEO

// SEO.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   image: PropTypes.string,
//   article: PropTypes.bool
// }

// SEO.defaultProps = {
//   title: null,
//   description: null,
//   image: null,
//   article: false,
// }