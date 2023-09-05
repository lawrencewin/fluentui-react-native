/** @jsxRuntime classic */
import React from 'react';
import { Animated } from 'react-native';

import { mergeProps, stagedComponent } from '@fluentui-react-native/framework';

import type { TabListAnimatedIndicatorProps } from './TabListAnimatedIndicator.types';
import { tablistAnimatedIndicatorName } from './TabListAnimatedIndicator.types';

export const TabListAnimatedIndicator = stagedComponent(() => (props: TabListAnimatedIndicatorProps) => {
  const { styles, ...rest } = props;
  const rootProps = mergeProps(rest, { style: styles.container });
  return (
    <Animated.View {...rootProps}>
      <Animated.View style={styles.indicator} />
    </Animated.View>
  );
});
TabListAnimatedIndicator.displayName = tablistAnimatedIndicatorName;

export default TabListAnimatedIndicator;
