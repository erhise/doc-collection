const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const docPost = path.resolve('src/templates/doc-post.js');
  const tagPage = path.resolve('src/templates/tag-page.js');

  graphql(
    `
      query {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title,
                tags
              }
            }
          }
        }
      }
    `
    ).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      const posts = result.data.allMarkdownRemark.edges;

      // Create post for detail pages
      posts.forEach(({ node }, index) => {
        createPage({
          path: node.fields.slug,
          component: docPost,
          context: {
            slug: node.fields.slug,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === posts.length - 1 ? null : posts[index + 1].node,
          },
        });
      });

      // Tag pages
      let tags = [];

      posts.forEach(({ node }) => {
        if (node.frontmatter.tags !== 'undefined') {
          tags = tags.concat(node.frontmatter.tags);
        }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}`,
          component: tagPage,
          context: {
            tag,
          },
        })
      });

  })
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split("---")[1]}/`;
    createNodeField({ node, name: `slug`, value: slug });
  } else if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === "undefined"
  ) {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}`
      );
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs });
    }
  }
}
