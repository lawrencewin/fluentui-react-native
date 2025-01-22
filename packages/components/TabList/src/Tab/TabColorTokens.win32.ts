import type { Theme } from '@fluentui-react-native/framework';
import { isHighContrast } from '@fluentui-react-native/theming-utils';
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
      backgroundColor: t.colors.neutralBackground1,
      borderColor: t.colors.transparentStroke,
      color: t.colors.neutralForeground2,
      iconColor: t.colors.neutralForeground2,
    },
    filledCircular: {
      backgroundColor: t.colors.neutralBackground3,
      borderColor: t.colors.transparentBackground,
      color: t.colors.neutralForeground2,
      iconColor: t.colors.neutralForeground2,
    },
    selected: {
      color: t.colors.neutralForeground1,
      iconColor: t.colors.compoundBrandForeground1,
      indicatorColor: t.colors.compoundBrandStroke1,
      pressed: {
        color: isHighContrast(t) ? t.colors.neutralForeground2 : t.colors.neutralForeground1Pressed,
        iconColor: isHighContrast(t) ? t.colors.neutralForeground2 : t.colors.compoundBrandForeground1Pressed,
        indicatorColor: t.colors.compoundBrandStroke1Pressed,
      },
      subtleCircular: {
        backgroundColor: t.colors.brandBackground2,
        borderColor: t.colors.compoundBrandStroke1,
        color: t.colors.brandForeground2,
        iconColor: t.colors.brandForeground2,
      },
      filledCircular: {
        backgroundColor: t.colors.brandBackgroundStatic,
        color: t.colors.neutralForegroundOnBrand,
        iconColor: t.colors.neutralForegroundOnBrand,
      },
    },
    disabled: {
      color: isHighContrast(t) ? t.colors.neutralStrokeDisabled : t.colors.neutralForegroundDisabled,
      iconColor: isHighContrast(t) ? t.colors.neutralStrokeDisabled : t.colors.neutralForegroundDisabled,
      selected: {
        color: isHighContrast(t) ? t.colors.neutralStrokeDisabled : t.colors.neutralForegroundDisabled,
        iconColor: isHighContrast(t) ? t.colors.neutralStrokeDisabled : t.colors.neutralForegroundDisabled,
        indicatorColor: isHighContrast(t) ? t.colors.neutralStrokeDisabled : t.colors.neutralForegroundDisabled,
      },
    },
    hovered: {
      color: isHighContrast(t) ? t.colors.neutralForeground2 : t.colors.neutralForeground2Hover,
      iconColor: isHighContrast(t) ? t.colors.compoundBrandForeground1Hover : t.colors.neutralForeground2Hover,
      indicatorColor: isHighContrast(t) ? t.colors.compoundBrandStroke1Hover : t.colors.neutralStroke1Hover,
      selected: {
        color: isHighContrast(t) ? t.colors.neutralForeground2 : t.colors.neutralForeground1Hover,
        iconColor: isHighContrast(t) ? t.colors.neutralForeground2 : t.colors.compoundBrandForeground1Hover,
        indicatorColor: t.colors.compoundBrandStroke1Hover,
        subtle: {
          indicatorColor: isHighContrast(t) ? t.colors.neutralStroke1 : t.colors.compoundBrandStroke1Hover,
        },
        filledCircular: {
          backgroundColor: t.colors.brandBackgroundHover,
          color: t.colors.neutralForegroundOnBrand,
          iconColor: t.colors.neutralForegroundOnBrand,
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
        indicatorColor: isHighContrast(t) ? t.colors.neutralStroke1 : t.colors.neutralStroke1Hover,
      },
      subtleCircular: {
        backgroundColor: t.colors.neutralBackground1Hover,
        borderColor: t.colors.neutralStroke1Hover,
        color: t.colors.neutralForeground2Hover,
        iconColor: t.colors.neutralForeground2Hover,
      },
      filledCircular: {
        backgroundColor: t.colors.neutralBackground3Hover,
        color: t.colors.neutralForeground2Hover,
        iconColor: t.colors.neutralForeground2Hover,
      },
    },
    pressed: {
      color: isHighContrast(t) ? t.colors.neutralForeground2 : t.colors.neutralForeground2Pressed,
      iconColor: isHighContrast(t) ? t.colors.neutralForeground2 : t.colors.neutralForeground2Pressed,
      indicatorColor: isHighContrast(t) ? t.colors.compoundBrandBackground1Pressed : t.colors.neutralStroke1Pressed,
      transparent: {
        backgroundColor: t.colors.transparentBackgroundPressed,
      },
      subtle: {
        backgroundColor: t.colors.subtleBackgroundPressed,
      },
      subtleCircular: {
        backgroundColor: t.colors.neutralBackground1Pressed,
        borderColor: t.colors.neutralStroke1Pressed,
        color: t.colors.neutralForeground2Pressed,
        iconColor: t.colors.neutralForeground2Pressed,
      },
      filledCircular: {
        backgroundColor: t.colors.brandBackgroundPressed,
        color: t.colors.neutralForegroundOnBrand,
        iconColor: t.colors.neutralForegroundOnBrand,
      },
    },
    focused: {
      borderColor: isHighContrast(t) ? t.colors.compoundBrandStroke1 : t.colors.neutralForeground1,
      subtleCircular: {
        borderColor: t.colors.transparentStroke,
      },
    },
  } as TabTokens);
