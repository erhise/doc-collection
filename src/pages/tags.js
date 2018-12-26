import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/layout';
import Container from '../components/container';
import { itemListDocs } from '../utils/sidebar/item-list';

const TagsPage = props => {
  const {
    allMarkdownRemark: { group },
    // site: {
    //   siteMetadata: { title },
    // },
  } = props.data;

  return (
    <Layout location={props.location} itemList={itemListDocs} isSidebarDisabled>
      <Container>
        <h1 css={{ marginTop: 0 }}>Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
