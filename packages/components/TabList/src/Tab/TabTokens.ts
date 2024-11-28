import { buildUseTokens } from '@fluentui-react-native/framework';
import type { Theme } from '@fluentui-react-native/framework';
import { globalTokens } from '@fluentui-react-native/theme-tokens';
import type { TokenSettings } from '@fluentui-react-native/use-styling';

import type { TabTokens } from './Tab.types';
import { tabName } from './Tab.types';
import { defaultTabColorTokens } from './TabColorTokens';

export const tabStates: (keyof TabTokens)[] = [
  'small',
  'medium',
  'large',
  'vertical',
  'circular',
  'hovered',
  'disabled',
  'selected',
  'focused',
  'pressed',
  'transparent',
  'subtle',
  'filledCircular',
  'subtleCircular',
  'hasIcon',
];

export const defaultTabTokens: TokenSettings<TabTokens, Theme> = {
  indicatorOrientation: 'horizontal',
  indicatorThickness: 2,
  borderWidth: 2,
  borderRadius: 4,
  contentMarginStart: 2,
  contentMarginEnd: 2,
  flexDirection: 'column',
  indicatorRadius: 99,
  numberOfLines: 1,
  small: {
    iconSize: 20,
    iconMargin: 2,
    indicatorMargin: 8,
    stackMarginHorizontal: 6,
    stackMarginVertical: 8,
    variant: 'body1',
    vertical: {
      indicatorMargin: 4,
      stackMarginHorizontal: 6,
      stackMarginVertical: 2,
    },
    circular: {
      stackMarginHorizontal: globalTokens.size80,
      stackMarginVertical: globalTokens.size40,
      iconMargin: globalTokens.size20,
    },
    selected: {
      variant: 'body1Strong',
    },
  },
  medium: {
    iconSize: 20,
    iconMargin: 6,
    indicatorMargin: 12,
    stackMarginHorizontal: 10,
    stackMarginVertical: 12,
    variant: 'body1',
    vertical: {
      indicatorMargin: 8,
      stackMarginHorizontal: 10,
      stackMarginVertical: 6,
    },
    circular: {
      stackMarginHorizontal: globalTokens.size100,
      stackMarginVertical: globalTokens.size60,
      iconMargin: globalTokens.size40,
    },
    selected: {
      variant: 'body1Strong',
    },
  },
  large: {
    iconSize: 24,
    iconMargin: 6,
    indicatorMargin: 12,
    stackMarginHorizontal: 10,
    stackMarginVertical: 16,
    variant: 'body2',
    large: {
      indicatorMargin: 10,
      stackMarginHorizontal: 10,
      stackMarginVertical: 8,
    },
    circular: {
      stackMarginHorizontal: globalTokens.size160,
      stackMarginVertical: globalTokens.size80,
      iconMargin: globalTokens.size40,
    },
    selected: {
      variant: 'subtitle2',
    },
  },
  vertical: {
    flexDirection: 'row-reverse',
    indicatorOrientation: 'vertical',
  },
  circular: {
    borderRadius: globalTokens.corner.radiusCircular,
    borderWidth: globalTokens.stroke.width10,
  },
  hasIcon: {
    contentMarginStart: 8,
  },
} as TabTokens;

export const useTabTokens = buildUseTokens(defaultTabTokens, defaultTabColorTokens, tabName);
