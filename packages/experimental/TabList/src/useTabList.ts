import * as React from 'react';
import type { View } from 'react-native';

// import { useSelectedKey } from '@fluentui-react-native/interactive-hooks';

import type { TabListProps, TabListState, TabListInfo } from './TabList.types';

/**
 * Re-usable hook for Tabs.
 * This hook configures tabs props and state for Tabs.
 *
 * @param props user props sent to Tabs
 * @returns configured props and state for Tabs
 */
export const useTabList = (props: TabListProps): TabListInfo => {
  const defaultComponentRef = React.useRef(null);
  const { componentRef = defaultComponentRef, selectedValue: selectedKey } = props;

  // const data = useSelectedKey(selectedKey || defaultSelectedKey || null, onTabsClick);

  // selectedTabsItemRef should be set to default tabbale element.
  const [selectedTabsItemRef, setSelectedTabsItemRef] = React.useState(React.useRef<View>(null));

  const onSelectTabsItemRef = React.useCallback(
    (ref: React.RefObject<View>) => {
      setSelectedTabsItemRef(ref);
    },
    [setSelectedTabsItemRef],
  );

  const state: TabListState = {
    context: {
      selectedValue: selectedKey,
      onTabSelect: () => false,
      updateSelectedTabsItemRef: onSelectTabsItemRef,
    },
  };

  return {
    props: {
      ...props,
      componentRef: componentRef,
      defaultTabbableElement: selectedTabsItemRef,
      isCircularNavigation: props.isCircularNavigation ?? false,
    },
    state: {
      ...state,
    },
  };
};
