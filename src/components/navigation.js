import React from 'react';
import presets, { colors } from '../utils/presets';
import typography, { rhythm, scale } from '../utils/typography';
import { Link } from 'gatsby';
import logo from '../logo.svg';

const navItemTopOffset = '0.6rem';
const navItemHorizontalSpacing = rhythm(1 / 3);

const isPartiallyActive = ({
  isPartiallyCurrent
}) => {
  return isPartiallyCurrent
    ? { style: styles.navItem.active }
    : {}
};

const NavItem = ({ linkTo, children }) => (
  <li css={styles.li}>
    <Link to={linkTo} getProps={isPartiallyActive} css={styles.navItem}>
      {children}
    </Link>
  </li>
);

const Navigation = ({ pathname }) => {
  // const isHomepage = pathname === '/';

  return (
    <header
      css={{
        backgroundColor: `rgba(255,255,255,0.975)`,
        position: `relative`,
        height: presets.headerHeight,
        left: 0,
        right: 0,
        top: presets.bannerHeight,
        zIndex: 2,
        '&:after': {
          content: `''`,
          position: `absolute`,
          bottom: 0,
          left: 0,
          right: 0,
          width: `100%`,
          height: 1,
          zIndex: -1,
          background: colors.ui.light,
        },
        paddingLeft: `env(safe-area-inset-left)`,
        paddingRight: `env(safe-area-inset-right)`,
        [presets.Tablet]: {
            position: 'fixed',
            backgroundColor: false,
        },
      }}
    >
      <div css={{...styles.containerInner}}>
        <Link
          to='/'
          css={styles.logoLink}
          aria-label='erhise, back to homepage'
        >
          <img
            src={logo}
            css={styles.logo}
            alt="erhise Logo"
            aria-hidden="true"
          />
        </Link>
        <nav
          className='navigation'
          aria-label='Primary Navigation'
          css={styles.navContainer}
        >
          <ul css={styles.ulContainer}>
            <NavItem linkTo='/docs'>Docs</NavItem>
            <NavItem linkTo='/tags'>Tags</NavItem>
            <NavItem linkTo='/links'>Links</NavItem>
          </ul>
        </nav>
        <div css={styles.searchAndSocialContainer}>
          <div
            css={{
              display: 'none',
              [presets.Desktop]: { dipslay: 'flex' },
              [presets.Hd]: { display: 'flex' },
            }}
          >
            SocialShit
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  li: {
    display: `block`,
    margin: 0,
    marginLeft: navItemHorizontalSpacing,
    marginRight: navItemHorizontalSpacing,
  },
  navContainer: {
    display: 'none',
    [presets.Tablet]: {
      display: 'flex',
      alignSelf: 'flex-end',
    },
  },
  ulContainer: {
    display: 'none',
    [presets.Tablet]: {
      display: 'flex',
      alignSelf: 'flex-end',
      flexGrow: 1,
      margin: 0,
      marginLeft: rhythm(1 / 4),
      listStyle: 'none',
      maskImage: `linear-gradient(to right, transparent, white ${rhythm(
        1 / 8
      )}, white 98% transparent)`,
      overflowX: 'auto',
    },
  },
  containerInner: {
    margin: '0 auto',
    paddingLeft: rhythm(3 / 4),
    paddingRight: rhythm(3 / 4),
    fontFamily: typography.options.headerFontFamily.join(','),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  navItem: {
    ...scale(-1 / 3),
    borderBottom: '0.125rem solid transparent',
    color: 'inherit',
    display: 'block',
    letterSpacing: '0.03em',
    WebkitFontSmoothing: 'antialiased',
    lineHeight: `calc(${presets.headerHeight} - ${navItemTopOffset})`,
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'uppercase',
    top: 0,
    transition: `color ${presets.animation.speedDefault} ${
      presets.animation.curveDefault
    }`,
    zIndex: 1,
    '&:hover': {
      color: colors.gatsby,
    },
    active: {
      borderBottomColor: colors.gatsby,
      color: colors.gatsby,
    },
  },
  searchAndSocialContainer: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  logo: {
    height: 28,
    margin: 0,
    [presets.Tablet]: {
      height: `1.55rem`,
    },
  },
  logoLink: {
    alignItems: `center`,
    color: `inherit`,
    display: `flex`,
    marginRight: rhythm(1 / 2),
    textDecoration: `none`,
  },
};

export default Navigation;
