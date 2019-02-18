const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);
const moment = require("moment");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` });
    let title = node.frontmatter.title;
    let date = node.frontmatter.date;
    if (title === "" || date === null) {
      let nameArr = slug.replace(/\//g, "").split("-");
      date = nameArr.splice(0, 3).join("-");
      title = nameArr.join(" ").replace(".md", "");
    }
    createNodeField({
      node,
      name: "slug",
      value: slug
    });
    createNodeField({
      node,
      name: "title",
      value: title
    });
    if (node.frontmatter.layout !== "page") {
      createNodeField({
        node,
        name: "date",
        value: moment(date).format("DD MMMM, YYYY")
      });
      createNodeField({
        node,
        name: "url",
        value: "https://dommagnifi.co" + slug
      });
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: node.fields.slug
        },
      });
    });
  });
};