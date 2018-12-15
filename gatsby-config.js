module.exports = {
  pathPrefix: "/doc-collection",
  siteMetadata: {
    title: 'My Collection of Markdowns',
    description: 'This is my collection of various documentation.',
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
  ],
};
