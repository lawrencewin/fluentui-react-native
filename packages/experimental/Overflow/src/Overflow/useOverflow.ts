import * as React from 'react';
import type { LayoutChangeEvent } from 'react-native';

import type { LayoutSize, OverflowInfo, OverflowState, OverflowProps, SetLayoutStateParam } from './Overflow.types';
import { createOverflowManager } from '../overflowManager';
import type { OverflowItemEntry, OverflowManager, OverflowUpdatePayload } from '../overflowManager.types';

type PartialOverflowState = Pick<OverflowState, 'hasOverflow' | 'itemVisibility'>;

interface LayoutState {
  container: boolean;
  menu: boolean;
  items: Record<string, boolean>;
}

export function useOverflow(props: OverflowProps): OverflowInfo {
  const { itemIDs, onLayout, onOverflowUpdate: overflowUpdateCallback } = props;
  const overflowManager = React.useRef<OverflowManager>(createOverflowManager()).current;

  const [containerSize, setContainerSize] = React.useState<LayoutSize>();
  const [overflowState, setOverflowState] = React.useState<PartialOverflowState>({
    hasOverflow: false,
    itemVisibility: {},
  });
  const [layoutState, setLayoutState] = React.useState<LayoutState>(() => {
    const itemLayoutState = {};
    for (const id of props.itemIDs) {
      itemLayoutState[id] = false;
    }
    return {
      container: false,
      menu: false,
      items: itemLayoutState,
    };
  });

  const userSetLayoutState = React.useCallback((data: SetLayoutStateParam) => {
    if (data.type === 'menu') {
      setLayoutState((prev) => ({ ...prev, menu: data.layoutDone }));
    } else {
      setLayoutState((prev) => ({ ...prev, items: { ...prev.items, [data.id]: data.layoutDone } }));
    }
  }, []);

  const onContainerLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;
      if (width !== undefined && height !== undefined) {
        setContainerSize({ width, height });
      }
      onLayout && onLayout(e);
    },
    [onLayout],
  );

  const handleItemUpdate = React.useCallback(
    (item: OverflowItemEntry) => {
      if (overflowManager.hasItem(item.id)) {
        overflowManager.updateItem(item.id, item);
      } else {
        overflowManager.addItem(item);
      }
    },
    [overflowManager],
  );

  const onMenuLayout = React.useCallback((size: LayoutSize) => overflowManager.setMenuSize(size), [overflowManager]);

  const onOverflowUpdate = React.useCallback(
    (data: OverflowUpdatePayload) => {
      setOverflowState((prev) => {
        const visibilities: Record<string, boolean> = {};
        for (const id of data.visibleIds) {
          visibilities[id] = true;
        }
        for (const id of data.invisibleIds) {
          visibilities[id] = false;
        }
        return { ...prev, itemVisibility: visibilities, hasOverflow: data.invisibleIds.length > 0 };
      });
      overflowUpdateCallback && overflowUpdateCallback(data);
    },
    [overflowUpdateCallback],
  );

  React.useLayoutEffect(() => {
    if (!layoutState.container) {
      overflowManager.initialize({ debug: true, initialContainerSize: containerSize, onOverflowUpdate });
      overflowManager.update();
      setLayoutState((prev) => ({ ...prev, container: true }));
    } else {
      overflowManager.update(containerSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSize]);

  const initialLayoutDone =
    layoutState.container && layoutState.menu && itemIDs.map((id) => layoutState.items[id]).reduce((prev, curr) => prev && curr);

  return {
    state: {
      ...overflowState,
      initialOverflowLayoutDone: initialLayoutDone,
      setLayoutState: userSetLayoutState,
      updateOverflow: overflowManager.update,
      updateItem: handleItemUpdate,
      updateMenuSize: onMenuLayout,
    },
    props: {
      ...props,
      onLayout: onContainerLayout,
    },
  };
}
