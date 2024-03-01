/** @jsxRuntime classic */
/** @jsx withSlots */
import * as React from 'react';

import { ButtonV1 as Button } from '@fluentui-react-native/button';
import { mergeProps, compose, withSlots, buildProps } from '@fluentui-react-native/framework';
import type { UseSlots } from '@fluentui-react-native/framework';

import type { OverflowItemProps, OverflowItemType } from './OverflowItem.types';
import { overflowItemName } from './OverflowItem.types';
import { useOverflowItem } from './useOverflowItem';

export const OverflowItem = compose<OverflowItemType>({
  displayName: overflowItemName,
  tokens: [overflowItemName],
  slotProps: {
    root: buildProps(() => ({ accessible: false })),
  },
  slots: {
    root: Button,
  },
  useRender: (userProps: OverflowItemProps, useSlots: UseSlots<OverflowItemType>) => {
    const { props, state } = useOverflowItem(userProps);
    const Slots = useSlots(props);
    return (final: OverflowItemProps, ...children: React.ReactNode[]) => {
      const merged = mergeProps(props, final);
      if (!state.visible) {
        return null;
      }
      return <Slots.root {...merged}>{children}</Slots.root>;
    };
  },
});

export default OverflowItem;