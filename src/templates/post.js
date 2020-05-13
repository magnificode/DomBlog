import React from "react";
import { graphql } from 'gatsby'

import Wrapper from "./wrapper";
import SEO from "../components/SEO";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Wrapper>
      <SEO
        title={post.fields.title}
        description={post.fields.description}
        article
        image={`${post.fields.slug}social_img.jpg`}
      />
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
        description
        slug
      }
    }
  }
`;

