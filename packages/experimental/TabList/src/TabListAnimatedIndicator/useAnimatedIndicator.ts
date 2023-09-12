import React from 'react';
import { Animated } from 'react-native';
import type { LayoutRectangle, ViewStyle } from 'react-native';

import { mergeStyles } from '@fluentui-react-native/framework';
import type { LayoutEvent } from '@fluentui-react-native/interactive-hooks';

import type {
  ListLayoutMap,
  AnimatedIndicatorStyles,
  TabLayoutInfo,
  AnimatedIndicatorStylesUpdate,
  UseAnimatedIndicatorReturn,
} from './TabListAnimatedIndicator.types';
import type { TabListProps } from '../TabList/TabList.types';

/**
 * This hook handles logic for generating the styles for the TabList's Animated Indicator. Child Tabs add layout update events to state
 * variables here, which we use to either directly update the layout values of the animated indicator (on win32) or generate the transforms
 * to move the indicator (on non-win32 platforms).
 */
export function useAnimatedIndicator(props: TabListProps, selectedKey?: string): UseAnimatedIndicatorReturn {
  const { vertical } = props;

  const [listLayoutMap, setListLayoutMap] = React.useState<ListLayoutMap>({});
  const [tabListLayout, setTabListLayout] = React.useState<LayoutRectangle>();
  const [userDefinedAnimatedIndicatorStyles, setUserDefinedAnimatedIndicatorStyles] = React.useState<AnimatedIndicatorStyles>({
    container: {},
    indicator: {},
  });

  // animated values
  const indicatorTranslate = React.useRef(new Animated.Value(0)).current;
  const indicatorScale = React.useRef(new Animated.Value(1)).current;

  const addTabLayout = (tabKey: string, layoutInfo: TabLayoutInfo) => {
    setListLayoutMap((prev) => ({ ...prev, [tabKey]: { ...prev[tabKey], ...layoutInfo } }));
  };

  const updateStyles = (update: AnimatedIndicatorStylesUpdate) =>
    setUserDefinedAnimatedIndicatorStyles((prev) => {
      const newStyles: AnimatedIndicatorStyles = { ...prev };
      if (update.container) {
        newStyles.container = mergeStyles(prev.container, update.container);
      }
      if (update.indicator) {
        newStyles.indicator = mergeStyles(prev.indicator, update.indicator);
      }
      return newStyles;
    });

  const onTabListLayout = React.useCallback((e: LayoutEvent) => {
    if (e.nativeEvent.layout) {
      setTabListLayout(e.nativeEvent.layout);
    }
  }, []);

  const selectedIndicatorLayout = React.useMemo<TabLayoutInfo | null>(() => {
    return selectedKey ? listLayoutMap[selectedKey] : null;
  }, [selectedKey, listLayoutMap]);

  const [startingIndicatorLayout, setStartingIndicatorLayout] = React.useState<TabLayoutInfo | null>(null);

  React.useEffect(() => {
    if (startingIndicatorLayout === null && selectedIndicatorLayout) {
      setStartingIndicatorLayout(selectedIndicatorLayout);
    } else if (startingIndicatorLayout && selectedIndicatorLayout) {
      /**
       * Calculate transforms. Because the scale transform's origin is at the center, we need to calculate an extra offset to add to the
       * translate transform to place the indicator at the correct location on screen.
       */
      let scaleValue: number, translateValue: number, translateOffset: number;
      if (vertical) {
        scaleValue = selectedIndicatorLayout.height / startingIndicatorLayout.height;
        translateValue = selectedIndicatorLayout.y - startingIndicatorLayout.y;
        translateOffset = (selectedIndicatorLayout.height - startingIndicatorLayout.height) / 2;
      } else {
        scaleValue = selectedIndicatorLayout.width / startingIndicatorLayout.width;
        translateValue = selectedIndicatorLayout.x - startingIndicatorLayout.x;
        translateOffset = (selectedIndicatorLayout.width - startingIndicatorLayout.width) / 2;
      }
      Animated.timing(indicatorScale, {
        toValue: scaleValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(indicatorTranslate, {
        toValue: translateValue + translateOffset,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingIndicatorLayout, selectedIndicatorLayout, vertical]);

  // Calculate styles using both layout information and user defined styles
  const styles = React.useMemo<AnimatedIndicatorStyles | null>(() => {
    // if not all layout props have been recorded for the current selected indicator, don't render the animated indicator
    if (startingIndicatorLayout) {
      const { x, y, width, height, startMargin, tabBorderWidth } = startingIndicatorLayout;
      const containerStyles: ViewStyle = {
        position: 'absolute',
        ...userDefinedAnimatedIndicatorStyles.container,
      };
      const indicatorStyles: ViewStyle = {
        borderRadius: 99,
        ...userDefinedAnimatedIndicatorStyles.indicator,
        width: width,
        height: height,
      };
      // The layout properties of the indicator are set to its first location. Transforms are used to move it on screen when the selected value changes.
      if (vertical) {
        containerStyles.start = x + tabBorderWidth + 1;
        indicatorStyles.top = y + startMargin + tabBorderWidth + 1;
        indicatorStyles.transform = [{ translateY: indicatorTranslate as any }, { scaleY: indicatorScale as any }];
      } else {
        containerStyles.bottom = height + y + 1;
        indicatorStyles.left = x + startMargin + tabBorderWidth + 1;
        indicatorStyles.transform = [{ translateX: indicatorTranslate as any }, { scaleX: indicatorScale as any }];
      }
      return {
        container: containerStyles,
        indicator: indicatorStyles,
      };
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vertical, startingIndicatorLayout, selectedIndicatorLayout, userDefinedAnimatedIndicatorStyles]);

  return {
    addTabLayout,
    onTabListLayout,
    tabListLayout,
    styles,
    updateStyles,
  };
}
