import React from 'react';
import { Animated } from 'react-native';
import type { ViewStyle } from 'react-native';

import type { AnimatedIndicatorStyles } from './TabListAnimatedIndicator.types';
import type { TabLayoutInfo } from '../TabList/TabList.types';
import { TabListContext } from '../TabList/TabListContext';

/**
 * This hook handles logic for generating the styles for the TabList's Animated Indicator. Child Tabs add layout update events to state
 * variables here, which we use to either directly update the layout values of the animated indicator (on win32) or generate the transforms
 * to move the indicator (on non-win32 platforms).
 */
export function useAnimatedIndicatorStyles(): AnimatedIndicatorStyles {
  const { animatedIndicatorStyles, layout, selectedKey, vertical } = React.useContext(TabListContext);

  const selectedIndicatorLayout = React.useMemo<TabLayoutInfo | null>(() => {
    return selectedKey ? layout.tabs[selectedKey] : null;
  }, [selectedKey, layout.tabs]);

  // animated values
  const indicatorTranslate = React.useRef(new Animated.Value(0)).current;
  const indicatorScale = React.useRef(new Animated.Value(1)).current;

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
    if (!selectedIndicatorLayout) {
      return null;
    }
    const { x, y, width, height, startMargin, tabBorderWidth } = selectedIndicatorLayout;
    const containerStyles: ViewStyle = {
      position: 'absolute',
      ...animatedIndicatorStyles.container,
    };
    const indicatorStyles: ViewStyle = {
      borderRadius: 99,
      ...animatedIndicatorStyles.indicator,
      width: width,
      height: height,
    };
    if (vertical) {
      containerStyles.start = x + tabBorderWidth + 1;
      indicatorStyles.top = y + startMargin + tabBorderWidth + 1;
    } else {
      containerStyles.bottom = height + y + 1;
      indicatorStyles.start = x + startMargin + tabBorderWidth + 1;
    }
    return {
      container: containerStyles,
      indicator: indicatorStyles,
    };
  }, [vertical, selectedIndicatorLayout, animatedIndicatorStyles]);

  return styles;
}
