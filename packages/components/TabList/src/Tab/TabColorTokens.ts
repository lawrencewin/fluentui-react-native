import type { Theme } from '@fluentui-react-native/framework';
import type { TokenSettings } from '@fluentui-react-native/use-styling';

import type { TabTokens } from '..';

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

export const defaultTabColorTokens: TokenSettings<TabTokens, Theme> = (t: Theme) =>
  ({
    borderColor: t.colors.transparentBackground,
    color: t.colors.neutralForeground2,
    iconColor: t.colors.neutralForeground2,
    indicatorColor: t.colors.transparentBackground,
    transparent: {
      backgroundColor: t.colors.transparentBackground,
    },
    subtle: {
      backgroundColor: t.colors.subtleBackground,
    },
    subtleCircular: {
      backgroundColor: t.colors.brandBackground2,
      borderColor: t.colors.transparentBackground1,
      color: t.colors.brandForeground2,
      iconColor: t.colors.brandForegroundd2,
    },
    filledCircular: {
      backgroundColor: t.colors.brandBackground1,
      borderColor: t.colors.compoundBrandStroke1,
      color: t.colors.neutralForegroundOnBrand,
      iconColor: t.colors.neutralForegroundOnBrand,
    },
    selected: {
      color: t.colors.neutralForeground1,
      iconColor: t.colors.compoundBrandForeground1,
      indicatorColor: t.colors.compoundBrandStroke1,
      pressed: {
        color: t.colors.neutralForeground1Pressed,
        iconColor: t.colors.compoundBrandForeground1Pressed,
        indicatorColor: t.colors.compoundBrandStroke1Pressed,
      },
      subtleCircular: {
        backgroundColor: t.colors.brandBackground2,
        borderColor: t.colors.compoundBrandStroke1,
        color: t.colors.brandForeground2,
        iconColor: t.colors.brandForegroundd2,
      },
      filledCircular: {
        backgroundColor: t.colors.brandBackgroundStatic,
        color: t.colors.neutralForegroundOnBrand,
        iconColor: t.colors.neutralForegroundOnBrand,
      },
    },
    disabled: {
      color: t.colors.neutralForegroundDisabled,
      iconColor: t.colors.neutralForegroundDisabled,
      selected: {
        color: t.colors.neutralForegroundDisabled,
        iconColor: t.colors.neutralForegroundDisabled,
        indicatorColor: t.colors.neutralForegroundDisabled,
      },
    },
    hovered: {
      color: t.colors.neutralForeground2Hover,
      iconColor: t.colors.neutralForeground2Hover,
      indicatorColor: t.colors.neutralStroke1Hover,

      selected: {
        color: t.colors.neutralForeground1Hover,
        iconColor: t.colors.compoundBrandForeground1Hover,
        indicatorColor: t.colors.compoundBrandStroke1Hover,
        subtle: {
          indicatorColor: t.colors.compoundBrandStroke1Hover,
        },
      },
      disabled: {
        indicatorColor: t.colors.transparentBackground,
      },
      transparent: {
        backgroundColor: t.colors.transparentBackgroundHover,
      },
      subtle: {
        backgroundColor: t.colors.subtleBackgroundHover,
        indicatorColor: t.colors.neutralStroke1Hover,
      },
      subtleCircular: {
        backgroundColor: t.colors.neutralBackground1Hover,
        borderColor: t.colors.neutralStroke1Hover,
        color: t.colors.neutralForeground2Hover,
        iconColor: t.colors.neutralForeground2Hover,
      },
      filledCircular: {
        backgroundColor: t.colors.brandBackgroundHover,
        color: t.colors.neutralForegroundOnBrand,
        iconColor: t.colors.neutralForegroundOnBrand,
      },
    },
    pressed: {
      color: t.colors.neutralForeground2Pressed,
      iconColor: t.colors.neutralForeground2Pressed,
      indicatorColor: t.colors.neutralStroke1Pressed,
      transparent: {
        backgroundColor: t.colors.transparentBackgroundPressed,
      },
      subtle: {
        backgroundColor: t.colors.subtleBackgroundPressed,
      },
    },
    focused: {
      borderColor: t.colors.neutralForeground1,
    },
  } as TabTokens);
