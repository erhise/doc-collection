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
        name: `docs`,
        path: `${__dirname}/docs/`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `erhise`,
        short_name: `erhise`,
        start_url: `/doc-collection/`,
        background_color: `#ffffff`,
        theme_color: `#236678`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
