import React from "react";
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet"

import Wrapper from "./wrapper";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Wrapper>
      <Helmet>
        <title>{post.fields.title}</title>
      </Helmet>
      <article className="pv5 post">
        <header className="bg-parent sans-serif">
          <div className="mw9 center pa4 pt5-ns ph7-l">
            <time className="date f6 mb2 dib ttu tracked"><small>{post.fields.date}</small></time>
            <h3 className="f2 f1-m f-headline-l measure-narrow lh-title mv0">
              <span className="bg lh-copy color-font pv1 ph3 tracked-tight">
                {post.fields.title}
              </span>
            </h3>
          </div>
        </header>
        <div className="bg pa4 ph7-l georgia mw9-l center f5 f3-ns lh-copy measure georgia">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
    </Wrapper>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        title
        date
      }
    }
  }
`;

