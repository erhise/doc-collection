import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Container from '../components/container';

const TagRoute = ({ data, pageContext, location }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout location={location}>
      <Container>
        <h1 css={{ marginTop: 0 }}>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { fields: { slug }, frontmatter: { title } } = node;
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
};

export default TagRoute;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
