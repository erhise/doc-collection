const isItemActive = (location, item, activeItemHash) => {
  let pathName = location.pathname;
  if (pathName.startsWith('/doc-collection')) {
    pathName = pathName.substring(15);
  }
  const linkMatchesPathname = item.link === pathName
  const linkWithoutHashMatchesPathname =
    item.link.replace(/#.*/, ``) === pathName
  const activeItemHashFalsy = !activeItemHash || activeItemHash === `NONE`

  if (activeItemHash) {
    if (activeItemHash === `NONE` && linkWithoutHashMatchesPathname) {
      return item
    }

    if (item.link === `${pathName}#${activeItemHash}`) {
      return item
    }
  }

  if (linkMatchesPathname && activeItemHashFalsy) {
    return item
  }

  if (item.link === `${pathName}${location.hash}` && !activeItemHash) {
    return item
  }

  if (linkMatchesPathname && !location.hash && !activeItemHash) {
    return item
  }

  return false
}

const getActiveItem = (itemList, location, activeItemHash) => {
  for (let item of itemList) {
    if (item.link) {
      if (isItemActive(location, item, activeItemHash)) return item
    }

    if (item.items) {
      let activeSubItem = getActiveItem(item.items, location, activeItemHash)
      if (activeSubItem) return activeSubItem
    }
  }

  return false
}

export default getActiveItem
