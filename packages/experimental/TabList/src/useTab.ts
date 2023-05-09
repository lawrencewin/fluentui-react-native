import * as React from 'react';

import type { IFocusable } from '@fluentui-react-native/interactive-hooks';
import { usePressableState, useKeyProps, useOnPressWithFocus, useViewCommandFocus } from '@fluentui-react-native/interactive-hooks';

import type { TabProps, TabInfo } from './Tab.types';
import { TabListContext } from './TabList';

/**
 * Re-usable hook for TabsItem.
 * This hook configures tabs item props and state for TabsItem.
 *
 * @param props user props sent to TabsItem
 * @returns configured props and state for TabsItem
 */
export const useTab = (props: TabProps): TabInfo => {
  const defaultComponentRef = React.useRef<IFocusable>(null);
  const { accessibilityLabel, accessible, componentRef = defaultComponentRef, value, disabled, icon, ...rest } = props;
  // Grabs the context information from Tabs (currently selected TabsItem and client's onTabsClick callback).
  const info = React.useContext(TabListContext);

  const changeSelection = React.useCallback(() => {
    if (value != info.selectedValue) {
      // info.onTabSelect && info.onTabSelect(value);
      info.updateSelectedTabsItemRef && componentRef && info.updateSelectedTabsItemRef(componentRef);
    }
  }, [componentRef, info, value]);

  const changeSelectionWithFocus = useOnPressWithFocus(componentRef, changeSelection);

  const pressable = usePressableState({
    ...rest,
    onPress: changeSelectionWithFocus,
    onFocus: changeSelection,
  });

  const onKeyUpProps = useKeyProps(changeSelection, ' ', 'Enter');

  // Used when creating accessibility properties in mergeSettings below.
  const onAccessibilityAction = React.useCallback(
    (event: { nativeEvent: { actionName: any } }) => {
      switch (event.nativeEvent.actionName) {
        case 'Select':
          changeSelection();
          break;
      }
    },
    [changeSelection],
  );

  /* We use the componentRef of the currently selected tabsItem to maintain the default tabbable
  element in Tabs. Since the componentRef isn't generated until after initial render,
  we must update it once here. */
  React.useEffect(() => {
    if (value == info.selectedValue) {
      info.updateSelectedTabsItemRef && componentRef && info.updateSelectedTabsItemRef(componentRef);
    }
  }, [componentRef, info, value]);

  return {
    props: {
      ...pressable.props,
      accessible: accessible ?? true,
      accessibilityRole: 'tab',
      accessibilityLabel: accessibilityLabel,
      focusable: !disabled ?? true,
      accessibilityState: { disabled: disabled, selected: info.selectedValue === value },
      accessibilityActions: [{ name: 'Select' }],
      onAccessibilityAction: onAccessibilityAction,
      ref: useViewCommandFocus(componentRef),
      value: value,
      icon: icon,
      ...onKeyUpProps,
    },
    state: {
      ...pressable.state,
      selected: value === info.selectedValue,
    },
  };
};
