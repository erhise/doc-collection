import React from 'react';
import { graphql, Link } from 'gatsby';
import Header from '../components/Header';

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
      }}>
        {edges.map(edge => {
          const { node } = edge;
          return (
            <div key={node.fields.slug}>
              <Link to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </div>
          )
        })}

      </div>
      <div>
        <Link to='/tags'>Browse by Tag</Link>
      </div>
    </div>
  )
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

export default Layout;
