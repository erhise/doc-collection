import React from 'react';
import presets, { colors } from '../../utils/presets'
import { scale, options } from '../../utils/typography';
import Item from './item';
import ExpandAllButton from './button-expand-all';

import getActiveItem from '../../utils/sidebar/get-active-item';
import getActiveItemParents from '../../utils/sidebar/get-active-item-parents';

const isItemActive = (activeItemParents, item) => {
  if (activeItemParents) {
    for (const parent of activeItemParents) {
      if (parent === item.title) return true;
    }
  }
  return false;
};

const getOpenItemHash = (itemList, state) => {
  for (const item of itemList) {
    if (item.items) {
      state.openSectionHash[item.title] =
        isItemActive(state.activeItemParents, item) ||
        state.activeItemLink.title === item.title;
      
      getOpenItemHash(item.items, state);
    }
  }
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this._toggleSection = this._toggleSection.bind(this);
    this.state = { ...this._getInitialState(props) };
  }

  _getInitialState(props) {
    const activeItemLink = getActiveItem(
      props.itemList,
      props.location,
      props.activeItemHash
    );

    // {
    //   "openSectionHash": {
    //     "Documentation": false
    //   },
    //   "expandAll": false,
    //   "key": "docs",
    //   "activeItemLink": false,
    //   "activeItemParents": []
    // }

    const state = {
      openSectionHash: {},
      expandAll: false,
      key: props.itemList[0].key,
      activeItemHash: props.activeItemHash,
      activeItemLink: activeItemLink,
      activeItemParents: getActiveItemParents(
        props.itemList,
        activeItemLink,
        []
      ),
    };

    getOpenItemHash(props.itemList, state);
    state.expandAll = Object.entries(state.openSectionHash).every(k => k[1]);

    return state;
  }

  _toggleSection(item) {
    const { openSectionHash } = this.state;

    const state = {
      openSectionHash: {
        ...openSectionHash,
        [item.title]: !openSectionHash[item.title],
      },
    };

    state.expandAll = Object.entries(state.openSectionHash).every(k => k[1]);
    this.setState(state);
  }

  _expandAll = () => {
    if (this.state.expandAll) {
      this.setState({
        ...this._getInitialState(this.props),
        expandAll: false,
      });
    } else {
      const openSectionHash = { ...this.state.openSectionHash };
      Object.keys(openSectionHash).forEach(k => openSectionHash[k] = true);
      this.setState({ openSectionHash, expandAll: true });
    }
  }
  
  render() {
    const { closeSidebar, itemList, location } = this.props;
    const { openSectionHash, activeItemLink, activeItemParents } = this.state;

    return (
      <section
        aria-label='Secondary Navigation'
        id='SecondaryNavigation'
        className='docSearch-sidebar'
        css={{ height: '100%', background: '#fff' }}
      >
        {!itemList[0].disableExpandAll && (
          <header css={{ ...styles.utils }}>
            <ExpandAllButton
              onClick={this._expandAll}
              expandAll={this.state.expandAll}
            />
          </header>
        )}
        <nav
          css={{
            ...styles.sidebarScrollContainer,
            height: itemList[0].disableExpandAll
              ? '100%'
              : `calc(100% - ${presets.sidebarUtilityHeight})`,
            [presets.Tablet]: {
              ...styles.sidebarScrollContainerTablet
            },
          }}
        >
          <ul css={{ ...styles.list }}>
            {itemList.map((item, index) => (
              <Item
                activeItemLink={activeItemLink}
                activeItemParents={activeItemParents}
                isActive={openSectionHash[item.title]}
                item={item}
                key={index}
                level={0}
                location={location}
                onLinkClick={closeSidebar}
                onSectionTitleClick={this._toggleSection}
                openSectionHash={openSectionHash}
              />
            ))}
          </ul>
        </nav>
      </section>
    );
  }
};

export default Sidebar;

const styles = {
  utils: {
    borderRight: `1px solid ${colors.ui.border}`,
    display: 'flex',
    alignItems: 'center',
    height: presets.sidebarUtilityHeight,
    background: colors.ui.whisper,
    paddingLeft: 40,
    paddingRight: 8,
    borderBottom: `1px solid ${colors.ui.border}`,
  },
  sidebarScrollContainer: {
    WebkitOverflowScrolling: 'touch',
    background: '#fff',
    border: 0,
    display: 'block',
    overflowY: 'auto',
    transition: 'opacity 0.5s ease',
    zIndex: 10,
    borderRight: `1px solid ${colors.ui.border}`,
    '::-webkit-scrollbar': {
      height: '6px',
      width: '6px',
    },
    '::-webkit-scrollbar-thumb': {
      background: colors.ui.bright,
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: colors.lilac,
    },
    '::-webkit-scrollbar-track': {
      background: colors.ui.light,
    },
  },
  sidebarScrollContainerTablet: {
    backgroundColor: colors.ui.whisper,
    top: `calc(${presets.headerHeight} + ${presets.bannerHeight})`,
  },
  list: {
    margin: 0,
    paddingTop: 20,
    paddingBottom: 104,
    fontSize: scale(-2 / 10).fontSize,
    [presets.Tablet]: {
      fontSize: scale(-4 / 10).fontSize,
      paddingBottom: 20,
    },
    '& a': {
      fontFamily: options.systemFontFamily.join(','),
    },
    '& li': {
      margin: 0,
      listStyle: 'none',
    },
    '& > li:last-child > span:before': {
      display: 'none',
    },
  },
}
