import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";

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
      <section className="cf pv6 ph4 pa6-l bt mw9 center avenir">
        {data.allMarkdownRemark.edges.map(({ node }, idx) => (
          <article key={idx}>
            <Link to={node.fields.slug} className="post-title">
              <div className="flex flex-column flex-row-ns">
                <div className="w-100 pa3-l pl3-ns">
                  <h2 className="f2 f2-m lh-title mv0">
                    <span className="lh-copy pa3 tracked-tight">
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
          </article>
        ))}
      </section>
    </Wrapper>
  )
}

