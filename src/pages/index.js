import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Container from '../components/container';
// import { itemListDocs } from '../utils/sidebar/item-list';

const IndexRoute = ({ data, location }) => {
  // const docPosts = data.allMarkdownRemark.edges.map(item => item.node);
  return (
    <Layout location={location}>
      <Container>
        <h1 css={{ marginTop: 0 }}>Under construction</h1>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        </div>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

export default IndexRoute;
