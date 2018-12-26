import React from 'react';
import Accordion from './accordion';
import CreateLink from '../../utils/sidebar/create-link';

const isItemActive = (activeItemParents, item) => {
  if (activeItemParents) {
    for (const parent of activeItemParents) {
      if (parent === item.title) { return true; }
    }
  }
  return false;
}

const Item = props => {
  const {
    activeItemLink,
    activeItemParents,
    isActive,
    openSectionHash,
    item,
    level,
    location,
    onLinkClick,
    onSectionTitleClick,
    ui //optional
  } = props;
  const isParentOfActiveItem = isItemActive(activeItemParents, item);

  return (
    <React.Fragment>
      {item.items ? (
        <Accordion
          activeItemLink={activeItemLink}
          activeItemParents={activeItemParents}
          createLink={CreateLink}
          isActive={
            isActive ||
            item.link === location.pathname ||
            isParentOfActiveItem ||
            item.disableAccordions
          }
          isParentOfActiveItem={isParentOfActiveItem}
          level={level}
          item={item}
          location={location}
          onLinkClick={onLinkClick}
          openSectionHash={openSectionHash}
          onSectionTitleClick={onSectionTitleClick}
        />
      ) : (
        <li
          css={{
            ...props.styles,
            paddingLeft: 40,
          }}
        >
          {CreateLink({
            isActive: item.link === activeItemLink.link,
            item,
            location,
            onLinkClick,
            stepsUI: ui === 'steps'
          })}
        </li>
      )}
    </React.Fragment>
  );
};

export default Item;
