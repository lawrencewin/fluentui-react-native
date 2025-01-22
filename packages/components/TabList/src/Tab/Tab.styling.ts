import React from 'react';
import { Platform } from 'react-native';

import type { IViewProps } from '@fluentui-react-native/adapters';
import { borderStyles, fontStyles } from '@fluentui-react-native/framework';
import type { Theme } from '@fluentui-react-native/framework';
import type { IconPropsV1 as IconProps } from '@fluentui-react-native/icon';
import type { PressablePropsExtended } from '@fluentui-react-native/interactive-hooks';
import type { TextProps } from '@fluentui-react-native/text';

import type { TabProps, TabSlotProps, TabTokens } from './Tab.types';
import type { TabListState } from '../TabList/TabList.types';

/**
 * Hook to get the style props for each Tab slot.
 */
export const useTabSlotProps = (props: TabProps, tokens: TabTokens, theme: Theme, context: TabListState): TabSlotProps => {
  const { canShowAnimatedIndicator, selectedKey, circular, vertical } = context;

  // Get each slot's props using our final tokens
  const root = React.useMemo<PressablePropsExtended>(() => {
    const rootBorderStyles = circular ? { borderRadius: tokens.borderRadius, padding: 0, margin: 0 } : borderStyles.from(tokens, theme);
    return {
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: tokens.flexDirection,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        padding: 1,
        backgroundColor: tokens.backgroundColor,
        ...(!vertical ? Platform.select({ macos: {}, default: { height: '100%' } }) : {}),
        ...rootBorderStyles,
      },
      enableFocusRing: circular,
    };
  }, [circular, tokens, theme, vertical]);

  const contentContainer = React.useMemo<IViewProps>(
    () => ({
      style: {
        flexDirection: 'row',
        paddingStart: tokens.contentMarginStart,
        paddingEnd: tokens.contentMarginEnd,
      },
    }),
    [tokens.contentMarginStart, tokens.contentMarginEnd],
  );

  const content = React.useMemo<TextProps>(
    () => ({
      numberOfLines: tokens.numberOfLines,
      style: {
        color: tokens.color,
        ...fontStyles.from(tokens, theme),
      },
    }),
    [tokens, theme],
  );

  const icon = React.useMemo<IconProps>(() => {
    if (props.icon) {
      return { ...props.icon, color: tokens.iconColor, size: tokens.iconSize };
    }
    return {};
  }, [props.icon, tokens.iconColor, tokens.iconSize]);

  const stack = React.useMemo<IViewProps>(() => {
    const circularStyles = {
      marginHorizontal: 0,
      marginVertical: 0,
      paddingHorizontal: tokens.stackMarginHorizontal,
      paddingVertical: tokens.stackMarginVertical,
      ...borderStyles.from(tokens, theme),
    };
    return {
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 0,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: tokens.stackMarginHorizontal,
        marginVertical: tokens.stackMarginVertical,
        ...(circular ? circularStyles : {}),
      },
    };
  }, [circular, theme, tokens]);

  const indicatorContainer = React.useMemo<IViewProps>(
    () => ({
      style: {
        backgroundColor: theme.colors.transparentBackground,
        ...(vertical
          ? {
              height: '100%',
              width: tokens.indicatorThickness,
              paddingVertical: tokens.indicatorMargin,
            }
          : {
              width: '100%',
              height: tokens.indicatorThickness,
              paddingHorizontal: tokens.indicatorMargin,
            }),
      },
    }),
    [vertical, tokens.indicatorThickness, tokens.indicatorMargin, theme],
  );

  const indicator = React.useMemo<IViewProps>(
    // if we're the selected tab and we've generated styles for the animated indicator, render the static tab indicator as transparent.
    // The animated indicator will receive styling instead via useTabAnimation hook.
    () => {
      const hideStaticIndicator = props.tabKey === selectedKey && canShowAnimatedIndicator;
      return {
        style: {
          flex: 1,
          borderRadius: tokens.indicatorRadius,
          backgroundColor: hideStaticIndicator ? theme.colors.transparentBackground : tokens.indicatorColor,
        },
      };
    },
    [canShowAnimatedIndicator, props.tabKey, selectedKey, tokens.indicatorColor, tokens.indicatorRadius, theme],
  );

  return { root, contentContainer, content, icon, stack, indicatorContainer, indicator };
};
