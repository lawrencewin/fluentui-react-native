import * as React from 'react';
import type {
  AccessibilityRole,
  GestureResponderEvent,
  MouseEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';
import { useViewCommandFocus } from '@fluentui-react-native/interactive-hooks';
import { mergeProps } from '@fluentui-react-native/framework';
import type {
  SuggestionsComboboxProps,
  SuggestionsComboboxSlotProps,
  SuggestionsComboboxState,
} from '../combobox/SuggestionsCombobox.types';
import { useMergedRefs } from '../../utils/useMergedRefs';
import { mergeCallbacks } from '../../utils/mergeCallbacks';
import { getDropdownActionFromKey, getIndexFromAction } from './dropdownActions';

/*
 * useTriggerListboxSlots returns a tuple of trigger/listbox shorthand,
 * with the semantics and event handlers needed for the Combobox and Dropdown components.
 * The element type of the ref should always match the element type used in the trigger shorthand.
 */
export function useTriggerListboxSlots(
  props: SuggestionsComboboxProps,
  state: Omit<SuggestionsComboboxState, keyof SuggestionsComboboxSlotProps | 'listboxRef' | 'iconSlot'>,
  ref: React.ForwardedRef<TextInput>,
  rootSlotProps?: SuggestionsComboboxSlotProps['root'],
  triggerSlotProps?: SuggestionsComboboxSlotProps['textInput'],
  listboxSlotProps?: SuggestionsComboboxSlotProps['listbox'],
): [
  root: SuggestionsComboboxSlotProps['root'],
  trigger: SuggestionsComboboxSlotProps['textInput'],
  listbox?: SuggestionsComboboxSlotProps['listbox'],
] {
  const {
    activeOption,
    getCount,
    getIndexOfText,
    getOptionAtIndex,
    ignoreNextBlur,
    open,
    selectOption,
    setActiveOption,
    setFocusVisible,
    setHasFocus,
    setOpen,
  } = state;

  // handle trigger focus/blur
  const triggerRef: typeof ref = React.useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusableTriggerRef = useViewCommandFocus(triggerRef as any);

  // resolve listbox shorthand props
  let listbox: typeof listboxSlotProps = listboxSlotProps && {
    ...listboxSlotProps,
  };

  // resolve trigger shorthand props
  const trigger: typeof triggerSlotProps = {
    accessible: true,
    accessibilityRole: 'textbox' as AccessibilityRole,
    focusable: true,
    ...triggerSlotProps,
    // explicitly type the ref as an intersection here to prevent type errors
    // since the `children` prop has mutually incompatible types between input/button
    // functionally both\facebook\react\issues\14920 ref and triggerRef will always be the same element type
    ref: useMergedRefs(ref, triggerSlotProps?.ref, focusableTriggerRef),
  };

  const root: typeof rootSlotProps = { ...rootSlotProps };

  /*
   * Handle focus when clicking the listbox popup:
   * 1. Move focus back to the button/input when the listbox is clicked (otherwise it goes to body)
   * 2. Do not close the listbox on button/input blur when clicking into the listbox
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listboxOnClick = React.useCallback(
    mergeCallbacks((_event: GestureResponderEvent) => {
      triggerRef.current?.focus();
    }, listbox?.onPress ?? undefined),
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listboxOnMouseEnter = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
    mergeCallbacks((_event: any) => {
      setFocusVisible(false);
    }, listbox?.onHoverIn),
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listboxOnResponderStart = React.useCallback(
    mergeCallbacks((_event: GestureResponderEvent) => {
      ignoreNextBlur.current = true;
    }, listbox?.onResponderStart),
    [],
  );

  // listbox is nullable, only add event handlers if it exists
  if (listbox) {
    listbox = mergeProps(listbox, { onPress: listboxOnClick, onHoverIn: listboxOnMouseEnter, onResponderStart: listboxOnResponderStart });
  }

  // the trigger should open/close the popup on click or blur
  trigger.onBlur = mergeCallbacks((event: unknown) => {
    if (!ignoreNextBlur.current) {
      setOpen(event, false);
    }

    ignoreNextBlur.current = false;

    setHasFocus(false);
  }, trigger.onBlur);

  trigger.onPressIn = mergeCallbacks((event: NativeSyntheticEvent<NativeTouchEvent>) => {
    setOpen(event, !open);
  }, trigger.onPressIn);

  trigger.onFocus = mergeCallbacks((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setOpen(event, true);
    setHasFocus(true);
  }, trigger.onFocus);

  // handle combobox keyboard interaction
  // TODO: needs cross plat
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
  trigger.keyDownEvents = [{ key: 'ArrowDown' }, { key: 'ArrowUp' }, open && { key: 'Escape' }] as any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
  root.onKeyDown = mergeCallbacks((event: any) => {
    const action = getDropdownActionFromKey(event, { open });
    const maxIndex = getCount() - 1;
    const activeIndex = activeOption ? getIndexOfText(activeOption.text) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case 'Open':
        setFocusVisible(true);
        setOpen(event, true);
        break;
      case 'Close':
        setOpen(event, false);
        setHasFocus(true);
        break;
      case 'Select':
        activeOption && selectOption(event, activeOption);
        break;
      case 'Tab':
        break;
      default:
        newIndex = getIndexFromAction(action, activeIndex, maxIndex);
    }

    if (newIndex !== activeIndex) {
      setActiveOption(getOptionAtIndex(newIndex));
      setFocusVisible(true);
    }
  }, root.onKeyDown);

  root.onMouseEnter = mergeCallbacks((_event: MouseEvent) => {
    setFocusVisible(false);
  }, root.onMouseEnter);

  return [root, trigger, listbox];
}
