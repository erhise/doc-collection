import React from 'react';
import { graphql, Link } from 'gatsby';

const Template = ({data, pageContext}) => {
  const { next, prev } = pageContext;
  const { markdownRemark } = data;
  const title = markdownRemark.frontmatter.title;
  const html = markdownRemark.html;
  return (
    <div>
      <h1>{title}</h1>
      <div className='markdown'
        dangerouslySetInnerHTML={{__html: html}}
      />
      {prev &&
        <Link to={prev.fields.slug}>
          Prev
        </Link>
      }
      {next &&
        <Link to={next.fields.slug}>
          Next
        </Link>
      }
      <div>
        <Link to='/'>Go back Home</Link>
      </div>
    </div>
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
