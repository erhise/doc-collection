import React from 'react';
import presets from '../utils/presets';
import Banner from '../components/banner';
import Navigation from '../components/navigation';
import PageWithSidebar from '../components/page-with-sidebar';
import NavigationMobile from './navigation-mobile';

// Import Futura PT typeface
import "../../static/fonts/Webfonts/futurapt_book/stylesheet.css"
import "../../static/fonts/Webfonts/futurapt_bookitalic/stylesheet.css"
import "../../static/fonts/Webfonts/futurapt_demi/stylesheet.css"
import "../../static/fonts/Webfonts/futurapt_demiitalic/stylesheet.css"

// Other fonts
import "typeface-spectral"

const DefaultLayout = props => {
  // const isHomepage = props.location.pathname === '/';
  const isHomepage = false;
  const isSidebarDisabled =
    props.isSidebarDisabled || !props.itemList;
  return (
    <div className={isHomepage ? `is-homepage` : ``}>
      <Banner background={false}>
        Watch me!
      </Banner>
      <Navigation pathname={props.location.pathname} />
      <div
        className={`main-body`}
        css={{
          paddingTop: presets.bannerHeight,
          [presets.Tablet]: {
            margin: `0 auto`,
            paddingTop: isHomepage
              ? presets.bannerHeight
              : `calc(${presets.bannerHeight} + ${presets.headerHeight})`,
          },
          paddingLeft: `env(safe-area-inset-left)`,
          paddingRight: `env(safe-area-inset-right)`,
        }}
      >
        <PageWithSidebar
          disable={isSidebarDisabled}
          itemList={props.itemList}
          location={props.location}
          renderContent={() => props.children}
        />
        <NavigationMobile />
      </div>
    </div>
  );
};

export default DefaultLayout;
