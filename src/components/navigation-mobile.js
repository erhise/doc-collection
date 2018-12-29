import React from 'react';
import { Link } from 'gatsby';
import presets, { colors } from '../utils/presets';
import typography, { rhythm, scale, options } from '../utils/typography';

const MobileNavItem = ({ linkTo, label, icon }) => (
  <Link to={linkTo} css={{ ...styles.link.default, ...styles.svg.default }}>
    <span dangerouslySetInnerHTML={{ __html: icon }} />
    <div>{label}</div>
  </Link>
);

const NavigationMobile = () => (
  <React.Fragment>
    <span
      css={{
        position: `absolute`,
        width: 1,
        height: 1,
        padding: 0,
        overflow: `hidden`,
        clip: `rect(0,0,0,0)`,
        whiteSpace: `nowrap`,
        border: 0,
      }}
    >
    </span>
    <div
      css={{
        position: `fixed`,
        display: `flex`,
        justifyContent: `space-around`,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderTop: `1px solid ${colors.ui.border}`,
        background: colors.ui.whisper,
        minHeight: presets.headerHeight,
        fontFamily: typography.options.headerFontFamily.join(`,`),
        paddingBottom: `env(safe-area-inset-bottom)`,
        [presets.Tablet]: {
          display: 'none',
        },
      }}
    >
      <MobileNavItem linkTo="/" label="Home" />
      <MobileNavItem linkTo="/docs" label="Docs" />
      <MobileNavItem linkTo="/tags" label="Tags" />
    </div>
  </React.Fragment>
);

export default NavigationMobile;

const styles = {
  svg: {
    default: {
      "& .svg-stroke": {
        strokeMiterlimit: 10,
        strokeWidth: 1.4173,
      },
      "& .svg-stroke-accent": { stroke: colors.lavender },
      "& .svg-stroke-lilac": { stroke: colors.lavender },
      "& .svg-fill-lilac": { fill: colors.lavender },
      "& .svg-fill-gatsby": { fill: colors.lavender },
      "& .svg-fill-brightest": { fill: `#fff` },
      "& .svg-fill-accent": { fill: colors.lavender },
      "& .svg-stroke-gatsby": { stroke: colors.lavender },
      "& .svg-fill-gradient-accent-white-top": { fill: `transparent` },
      "& .svg-fill-gradient-accent-white-45deg": { fill: `transparent` },
      "& .svg-fill-gradient-accent-white-bottom": { fill: `#fff` },
      "& .svg-fill-gradient-purple": { fill: colors.lavender },
      "& .svg-stroke-gradient-purple": { stroke: colors.lavender },
      "& .svg-fill-wisteria": { fill: `transparent` },
    },
  },
  link: {
    default: {
      color: 'red',
      borderRadius: presets.radius,
      fontSize: scale(-1 / 2).fontSize,
      flexShrink: 0,
      lineHeight: 1,
      width: 64,
      padding: `${rhythm(options.blockMarginBottom / 4)} ${rhythm(
        options.blockMarginBottom / 4
      )} 0`,
      textDecoration: `none`,
      textAlign: `center`,
      "& svg": {
        display: `block`,
        height: 32,
        margin: `0 auto`,
        "& path, & line, & polygon": {
          transition: `all ${presets.animation.speedDefault} ${
            presets.animation.curveDefault
          }`,
        },
      },
    },
    active: {
      "&&": {
        color: colors.gatsby,
        fontWeight: `bold`,
      },
    },
  },
};
