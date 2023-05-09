import * as React from 'react';

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
  const focusZoneRef = React.useRef(null);
  const { componentRef = defaultComponentRef, selectedValue: selectedKey, isCircularNavigation } = props;

  // const data = useSelectedKey(selectedKey || defaultSelectedKey || null, onTabsClick);

  // Stores views to be displayed.

  const state: TabListState = {
    context: {
      selectedValue: selectedKey,
      onTabSelect: () => false,
      focusZoneRef: focusZoneRef,
    },
  };

  return {
    props: {
      ...props,
      componentRef: componentRef,
      isCircularNavigation: isCircularNavigation ?? false,
    },
    state: {
      ...state,
    },
  };
};
