import * as React from 'react';

import { usePressableState, useViewCommandFocus } from '@fluentui-react-native/interactive-hooks';

import type { TabProps, TabInfo, TabState } from './Tab.types';
import { TabListContext } from './TabList';

/**
 * Re-usable hook for TabsItem.
 * This hook configures tabs item props and state for TabsItem.
 *
 * @param props user props sent to TabsItem
 * @returns configured props and state for TabsItem
 */
export const useTab = (props: TabProps): TabInfo => {
  const defaultComponentRef = React.useRef(null);
  const { accessibilityLabel, accessible, componentRef = defaultComponentRef, value, disabled, ...rest } = props;
  // Grabs the context information from Tabs (currently selected TabsItem and client's onTabsClick callback).
  const info = React.useContext(TabListContext);

  const changeSelection = React.useCallback(() => {
    info.focusZoneRef?.current?.focus(); // GH #964, FocusZone not implemented on windows.
    // info.onTabSelect && info.onTabSelect(value);
    info.updateSelectedTabsItemRef && componentRef && info.updateSelectedTabsItemRef(componentRef);
  }, [componentRef, info]);

  const pressable = usePressableState({
    ...rest,
    onPress: changeSelection,
  });

  const state: TabState = {
    ...pressable.state,
    selected: info.selectedValue === value,
  };

  // Used when creating accessibility properties in mergeSettings below.
  const onAccessibilityAction = React.useCallback(
    (event: { nativeEvent: { actionName: any } }) => {
      switch (event.nativeEvent.actionName) {
        case 'Select':
          changeSelection();
          break;
      }
    },
    [info, value],
  );

  /* We use the componentRef of the currently selected tabsItem to maintain the default tabbable
  element in Tabs. Since the componentRef isn't generated until after initial render,
  we must update it once here. */
  React.useEffect(() => {
    if (value == info.selectedValue) {
      info.updateSelectedTabsItemRef && componentRef && info.updateSelectedTabsItemRef(componentRef);
    }
  }, []);

  return {
    props: {
      ...rest,
      ...pressable.props,
      accessible: accessible ?? true,
      ref: useViewCommandFocus(componentRef),
      accessibilityRole: 'tab',
      accessibilityLabel: accessibilityLabel,
      focusable: false,
      accessibilityState: { disabled: disabled, selected: info.selectedValue === value },
      accessibilityActions: [{ name: 'Select' }],
      onAccessibilityAction: onAccessibilityAction,
      value: value,
    },
    state: {
      ...state,
    },
  };
};
