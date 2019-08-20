import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import { ThemeContext } from '../ThemeContext';

import Wrapper from '../templates/wrapper';

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {fields: [fileAbsolutePath], order: DESC}) {
      totalCount
      edges {
        node {
          id
          fileAbsolutePath
          frontmatter {
            title
            layout
            publisher
            url
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
            title
            date
          }
          excerpt
        }
      }
    }
  }
`;

export default ({ data }) => {

  return (
    <Wrapper>
      <Helmet>
        <title>dommagnifi.co</title>
      </Helmet>
      <section className="cf pv6 ph4 pa6-l bt mw9 center avenir">
        {data.allMarkdownRemark.edges.map(({ node }, idx) => (
          <ThemeContext.Consumer key={idx}>
            {(context) => (
              <article className={`pb3 bb b--${context.dark ? 'white-10' : 'black-05'} bg-animate bg-transparent hover-bg-${context.dark ? 'black-30' : 'light-gray'}`}>
                {node.frontmatter.layout === 'post' &&
                  <Link to={node.fields.slug} className="post-title">
                    <div className="flex flex-column flex-row-ns">
                      <div className="w-100 pa3-l pl3-ns">
                        <h2 className="f2 f2-m lh-title mv0">
                          <span className="dib lh-copy pa3 tracked-tight">
                            {node.frontmatter.title}
                          </span>
                        </h2>
                        <p className="f5 lh-copy mv0">
                          <span className="lh-copy pa3 tracked-tight">
                            {node.frontmatter.date}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                }
                {node.frontmatter.layout === 'post-external' &&
                  <a target="_blank" rel="noopener noreferrer" href={node.frontmatter.url} className="post-title">
                    <div className="flex flex-column flex-row-ns">
                      <div className="w-100 pa3-l pl3-ns">
                        <h2 className="f2 f2-m lh-title mv0">
                          <span className="dib lh-copy pa3 tracked-tight">
                            {node.frontmatter.title}
                            { /* Icon credit to FontAwesome - https://fontawesome.com/license */ }
                            <svg focusable="false" class="svg-inline--fa fa-external-link-alt fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="32" height="32"><title>External Link</title><path fill="currentColor" d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z"></path></svg>
                          </span>
                        </h2>
                        <p className="f5 lh-copy mv0">
                          <span className="lh-copy pa3 tracked-tight">
                            Published {node.frontmatter.date} on {node.frontmatter.publisher}
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                }
              </article>
            )}
          </ThemeContext.Consumer>
        ))}
      </section>
    </Wrapper>
  )
}

