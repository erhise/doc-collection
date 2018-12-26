import React, { Component } from 'react';

import Sidebar from './sidebar';
import presets, { colors } from '../../utils/presets';
import { rhythm } from '../../utils/typography';

class StickyResposiveSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  _openSidebar = () => {
    this.setState({ open: !this.state.open });
  }

  _closeSidebar = () => {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;

    const menuOpacity = open ? 1 : 0;
    const menuOffset = open ? 0 : rhythm(10);

    return (
      <React.Fragment>
        <div
          css={{
            ...styles.sidebarScrollContainer,
            opacity: menuOpacity,
            pointerEvents: open ? `auto` : `none`,
          }}
        >
          <div
            css={{
              ...styles.sidebar,
              transform: `translateX(-${menuOffset})`,
            }}
          >
            <Sidebar
              closeSidebar={this._closeSidebar}
              {...this.props}
            />
          </div>
        </div>
        <div
          css={{ ...styles.sidebarToggleButton }}
          onClick={this._openSidebar}
          role='button'
          aria-label='Show Secondary Navigation'
          aria-controls='SecondaryNavigation'
          aria-expanded={open ? `true` : `false`}
          tabIndex={0}
        >
          <div css={{ ...styles.sidebarToggleButtonInner }}>
            +
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default StickyResposiveSidebar;

const styles = {
  sidebarScrollContainer: {
    display: 'block',
    height: '100vh',
    position: 'fixed',
    top: 0,
    bottom: 0,
    border: 0,
    width: 320,
    zIndex: 10,
    transition: 'opacity 0.5s ease',
    [presets.Tablet]: {
      height: `calc(100vh - ${presets.headerHeight} - ${presets.bannerHeight})`,
      maxWidth: 'none',
      opacity: '1 !important',
      pointerEvents: 'auto',
      top: `calc(${presets.headerHeight} + ${presets.bannerHeight})`,
      width: rhythm(10),
    },
    [presets.Desktop]: {
      width: rhythm(12),
    },
  },
  sidebar: {
    height: '100%',
    transition: 'transform 0.5s ease',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
    [presets.Tablet]: {
      transform: 'none !important',
      boxShadow: 'none',
    },
  },
  sidebarToggleButton: {
    backgroundColor: colors.gatsby,
    borderRadius: '50%',
    bottom: 64,
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    display: 'flex',
    height: 60,
    justifyContent: 'space-around',
    position: 'fixed',
    right: 20,
    visibility: 'visible',
    width: 60,
    zIndex: 20,
    [presets.Tablet]: { display: 'none' }
  },
  sidebarToggleButtonInner: {
    alignSelf: 'center',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: 20,
    width: 20,
    visibility: 'visible',
  },
};
