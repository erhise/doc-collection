import React from 'react';

import Item from './item';
import { Title, TitleButton, SplitButton } from './section-title';
import { colors } from '../../utils/presets';

const ItemWithSubItems = ({
  activeItemLink,
  createLink,
  isExpanded,
  isParentOfActiveItem,
  item,
  level,
  location,
  onLinkClick,
  onSectionTitleClick,
  uid,
}) => {
  const SectionTitleComponent = item.disableAccordions ? Title : TitleButton;
  const isActive = item.link === activeItemLink.link;
  
  return (
    <React.Fragment>
      {item.link ? (
        <SplitButton
          createLink={createLink}
          isActive={isActive}
          isExpanded={isExpanded}
          isParentOfActiveItem={isParentOfActiveItem}
          item={item}
          level={level}
          location={location}
          onLinkClick={onLinkClick}
          onSectionTitleClick={onSectionTitleClick}
          uid={uid}
        />
      ) : (
        <SectionTitleComponent
          isActive={isActive}
          isExpanded={isExpanded}
          isParentOfActiveItem={isParentOfActiveItem}
          item={item}
          level={level}
          onSectionTitleClick={onSectionTitleClick}
          title={item.title}
          uid={uid}
        />
      )}
    </React.Fragment>
  );
};

const paddingLeft = level => (level === 0 ? level + 1 * 40 : level + 1 * 20);

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(...args) {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(...args);
    }

    if (this.props.onSectionTitleClick) {
      this.props.onSectionTitleClick(...args);
    }
  }

  render() {
    const {
      activeItemLink,
      activeItemParents,
      createLink,
      isActive,
      isParentOfActiveItem,
      item,
      level,
      location,
      onLinkClick,
      onSectionTitleClick,
      openSectionHash,
    } = this.props;

    const isExpanded = openSectionHash[item.title] || item.disableAccordions;

    return (
      <li
        css={{
          background: 
            isActive && level > 0 ? colors.ui.light : false,
          position: 'relative',
        }}
      >
        <ItemWithSubItems
          activeItemLink={activeItemLink}
          activeItemParents={activeItemParents}
          createLink={createLink}
          isActive={isActive}
          isExpanded={isExpanded}
          isParentOfActiveItem={isParentOfActiveItem}
          item={item}
          level={level}
          location={location}
          onLinkClick={onLinkClick}
          onSectionTitleClick={onSectionTitleClick}
          // uid={uid}
        />
        <ul
          css={{
            ...styles.ul,
            display: isExpanded ? 'block' : 'none',
            paddingBottom: 40,
            '& li': {
              paddingLeft: paddingLeft(level)
            },
          }}
        >
          {item.items.map(subItem => (
            <Item
              activeItemLink={activeItemLink}
              activeItemParents={activeItemParents}
              createLink={createLink}
              item={subItem}
              key={subItem.title}
              level={level + 1}
              location={location}
              onLinkClick={onLinkClick}
              isExpanded={isExpanded}
              onSectionTitleClick={onSectionTitleClick}
              openSectionHash={openSectionHash}
              styles={{
                ...(item.ui === 'steps' && {
                  ...styles.ulStepsUI,
                }),
              }}
              ui={item.ui}
            />
          ))}
        </ul>
      </li>
    );
  }
}

export default Accordion;

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    position: 'relative',
    '& li': {
      marginBottom: 0,
    },
  },
  ulStepsUI: {
    '&:after': {
      background: colors.ui.bright,
      bottom: '1.5rem',
      content: `''`,
      position: 'absolute',
      left: 0,
      top: '1.5rem',
      width: 1,
    },
    '&:before': {
      content: `''`,
      borderLeft: `1px dashed ${colors.ui.bright}`,
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 0,
      height: '100%',
    },
  },
}