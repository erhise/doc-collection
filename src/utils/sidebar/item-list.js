import docsSidebar from '../../data/sidebars/doc-links.yaml';

const createHash = link => {
  let index = -1;
  if (link) index = link.indexOf('#');
  return index >= 0 ? link.substr(index + 1) : false;
};

const extendItemList = itemList => {
  itemList.forEach(section => {
    if (section.items) extendItem(section.items, section.title)
  });
  return itemList;
};

const extendItem = (items, parentTitle) => {
  items.forEach(item => {
    item.hash = createHash(item.link);
    item.parentTitle = parentTitle;
    if (item.items) extendItem(item.items, item.title);
  });
};

const itemListDocs = extendItemList(docsSidebar).map(item => {
  return { ...item, key: 'docs' };
});

export { itemListDocs };


/**
 * [
  {
    "title": "Documentation",
    "items": [
      {
        "title": "Introduction",
        "link": "/tags/",
        "hash": false,
        "parentTitle": "Documentation"
      },
      {
        "title": "Quick Start",
        "link": "/tags/",
        "hash": false,
        "parentTitle": "Documentation"
      },
      {
        "title": "Recipes",
        "link": "/tags/",
        "hash": false,
        "parentTitle": "Documentation"
      }
    ],
    "key": "docs"
  }
]
 */