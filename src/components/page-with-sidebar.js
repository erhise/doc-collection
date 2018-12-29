import React from 'react';

import presets from '../utils/presets';
import { rhythm } from '../utils/typography';
import StickyResposiveSidebar from './sidebar/sticky-responsive-sidebar';

const PageWithSidebar = props => {
  if (props.disable) {
    return props.renderContent();
  } else {
    return (
      <React.Fragment>
        <div
          css={{
            [presets.Tablet] : {
              paddingLeft: rhythm(10),
            },
            [presets.Desktop]: {
              paddingLeft: rhythm(12),
            }
          }}
        >
          {props.renderContent()}
        </div>
        <StickyResposiveSidebar
          itemList={props.itemList}
          key={props.location.pathname}
          location={props.location}
        />
      </React.Fragment>
    );
  }
};

export default PageWithSidebar;
