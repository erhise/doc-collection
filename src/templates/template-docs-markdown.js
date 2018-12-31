import React from 'react';
import {
    graphql,
    // Link,
} from 'gatsby';

import Layout from '../components/layout';
import Container from '../components/container';
import { itemListDocs } from '../utils/sidebar/item-list';

const Template = ({data, pageContext, location}) => {
  // const { next, prev } = pageContext;
  const page = data.markdownRemark;
  const title = page.frontmatter.title;
  return (
    <Layout location={location} itemList={itemListDocs}>
      <Container>
        <h1 id={title} css={{ marginTop: 0 }}>
          {title}
        </h1>
        <div className='markdown'
          dangerouslySetInnerHTML={{__html: page.html}}
        />
        {/* {prev &&
          <Link to={prev.fields.slug}>
            Prev
          </Link>
        }
        {next &&
          <Link to={next.fields.slug}>
            Next
          </Link>
        } */}
      </Container>
    </Layout>
  )
};

export const query = graphql`
  query ContentBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(fields: { slug: {eq: $slug} }) {
      html
      excerpt
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
      }
    }
  }
`

export default Template;
