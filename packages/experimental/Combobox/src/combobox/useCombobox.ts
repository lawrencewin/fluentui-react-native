import React from 'react';
import type {
  AccessibilityActionName,
  NativeSyntheticEvent,
  AccessibilityActionEvent,
  TextInputChangeEventData,
  TextInput,
  View,
  ViewProps,
  TextInputSubmitEditingEventData,
} from 'react-native';
import type { LayoutEvent } from '@fluentui-react-native/interactive-hooks';
import { usePressableState } from '@fluentui-react-native/interactive-hooks';
import type { SuggestionsComboboxListboxProps } from '../listbox/SuggestionsComboboxListbox.types';
import type { SuggestionsComboboxProps, SuggestionsComboboxSlotProps, SuggestionsComboboxState } from './SuggestionsCombobox.types';
import { useOptionCollection } from '../utils/useOptionCollection';
import type { OptionValue } from '../utils/OptionCollection.types';
import { useSelection } from '../utils/useSelection';
import { useControllableState } from '../../utils/useControllableState';
import { getDropdownActionFromKey } from '../utils/dropdownActions';
import { mergeCallbacks } from '../../utils/mergeCallbacks';
import { useMergedRefs } from '../../utils/useMergedRefs';
import { useTriggerListboxSlots } from '../utils/useTriggerListboxProps';

export function useFirstMount(): boolean {
  const isFirst = React.useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
}

const accessibilityActions = [{ name: 'Expand' as AccessibilityActionName }, { name: 'Collapse' as AccessibilityActionName }];

/**
 * State shared between Combobox and Dropdown components
 */
export const useComboboxBaseState = (
  props: SuggestionsComboboxProps & { children?: React.ReactNode },
): Omit<SuggestionsComboboxState, keyof SuggestionsComboboxSlotProps | 'listboxRef' | 'iconSlot'> => {
  const { onOpenChange } = props;

  const optionCollection = useOptionCollection();
  const { getOptionAtIndex } = optionCollection;

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();

  // track whether keyboard focus outline should be shown
  // tabster/keyborg doesn't work here, since the actual keyboard focus target doesn't move
  const [focusVisible, setFocusVisible] = React.useState(false);

  // track focused state to conditionally render collapsed listbox
  const [hasFocus, setHasFocus] = React.useState(false);

  const ignoreNextBlur = React.useRef(false);

  const selectionState = useSelection(props);
  const { selectedOptions } = selectionState;

  // calculate value based on props, internal value changes, and selected options
  const isFirstMount = useFirstMount();
  const [controllableValue, setValue] = useControllableState({
    state: props.value,
    initialState: undefined,
  });

  const value = React.useMemo(() => {
    // don't compute the value if it is defined through props or setValue,
    if (controllableValue !== undefined) {
      return controllableValue;
    }

    // handle defaultValue here, so it is overridden by selection
    if (isFirstMount && props.defaultValue !== undefined) {
      return props.defaultValue;
    }

    // editable inputs should not display multiple selected options in the input as text
    return '';

    // do not change value after isFirstMount changes,
    // we do not want to accidentally override defaultValue on a second render
    // unless another value is intentionally set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllableValue, props.defaultValue, selectedOptions]);

  // Handle open state, which is shared with options in context
  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const setOpen = React.useCallback(
    (event: unknown, newState: boolean) => {
      onOpenChange?.(event, { open: newState });
      setOpenState(newState);
    },
    [onOpenChange, setOpenState],
  );

  // update active option based on change in open state or children
  React.useEffect(() => {
    if (open && !activeOption && !hasFocus) {
      setActiveOption(getOptionAtIndex(0));
    } else if (!open) {
      // reset the active option when closing
      setActiveOption(undefined);
    }
    // this should only be run in response to changes in the open state or children
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {
    ...optionCollection,
    ...selectionState,
    activeOption,
    focusVisible,
    hasFocus,
    ignoreNextBlur,
    open,
    setActiveOption,
    setFocusVisible,
    setHasFocus,
    setOpen,
    setValue,
    value,
  };
};

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox = (props: SuggestionsComboboxProps, ref: React.ForwardedRef<TextInput>): SuggestionsComboboxState => {
  const baseState = useComboboxBaseState({ ...props });
  const { hasFocus, open, selectOption, setFocusVisible, setOpen, setValue, value } = baseState;
  const { children, disabled, iconSlot, onSubmitEditing, ...restProps } = props;

  const rootRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const listboxId = 'listboxId';

  // calculate listbox width style based on trigger width
  const [popupDimensions, setPopupDimensions] = React.useState<{ width: number }>();
  const [focusBarDimensions, setFocusBarDimesions] = React.useState<{ top: number; width: number }>();
  const onRootLayout = React.useCallback(
    (e: LayoutEvent) => {
      const width = e.nativeEvent.layout.width;
      const top = e.nativeEvent.layout.height - 2;
      if (width !== popupDimensions?.width) {
        setPopupDimensions({ width });
      }
      if (top !== focusBarDimensions?.top || width !== focusBarDimensions?.width) {
        setFocusBarDimesions({ top, width });
      }
    },
    [focusBarDimensions, popupDimensions],
  );

  /* Handle typed input */

  // reset any typed value when an option is selected
  baseState.selectOption = (ev: unknown, option: OptionValue) => {
    setValue(undefined);
    selectOption(ev, option);
    setFocusVisible(true);
  };

  baseState.setOpen = (ev: unknown | null, newState: boolean) => {
    if (disabled) {
      return;
    }

    setOpen(ev, newState);
  };

  // update value and active option based on input
  const onTriggerChange = (ev: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const inputValue = ev.nativeEvent.text;
    // update uncontrolled value
    baseState.setValue(inputValue);
  };

  // open Combobox when typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
  const onTriggerKeyDown = (ev: any) => {
    if (!open && getDropdownActionFromKey(ev) === 'Type') {
      baseState.setOpen(ev, true);
    }
  };

  const onDismiss = () => {
    baseState.setOpen(null, false);
  };

  const onAccessibilityAction = React.useCallback(
    (event: AccessibilityActionEvent) => {
      switch (event.nativeEvent.actionName) {
        case 'Collapse':
          setOpen(event, false);
          break;
        case 'Expand':
          setOpen(event, true);
          break;
      }
    },
    [setOpen],
  );

  const pressable = usePressableState(props.root ? { style: props.style, ...(props.root as ViewProps) } : { style: props.style });

  // resolve root text input and listbox slot props
  let rootProps: SuggestionsComboboxSlotProps['root'];
  let triggerProps: SuggestionsComboboxSlotProps['textInput'];
  let listboxProps: SuggestionsComboboxListboxProps | undefined;

  const hasListbox = (open || hasFocus) && children && React.Children.count(children) > 0;

  rootProps = {
    accessible: true,
    accessibilityActions: accessibilityActions,
    ...(hasListbox && listboxRef && listboxRef.current ? { accessibilityControls: listboxId } : {}),
    accessibilityState: { expanded: !!hasListbox },
    accessibilityRole: 'combobox',
    onAccessibilityAction: onAccessibilityAction,
    onLayout: onRootLayout,
    onKeyDown: onTriggerKeyDown,
    ...(pressable.props as SuggestionsComboboxSlotProps['root']),
  };

  rootProps.onKeyDown = mergeCallbacks(props.root?.onKeyDown, onTriggerKeyDown);

  triggerProps = {
    ref: useMergedRefs(ref, triggerRef),
    value: value ?? '',
    disabled,
    editable: disabled ? false : props.editable,
    ...restProps,
  };

  triggerProps.onChange = mergeCallbacks(triggerProps.onChange, onTriggerChange);
  triggerProps.onSubmitEditing = React.useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      if (!hasListbox) {
        onSubmitEditing && onSubmitEditing(e);
      }
    },
    [hasListbox, onSubmitEditing],
  );

  // only resolve listbox slot if needed
  listboxProps = hasListbox
    ? {
        accessible: true,
        accessibilityRole: 'menu',
        children: children,
        nativeID: listboxId,
        style: popupDimensions,
        ...props.listbox,
      }
    : undefined;

  [rootProps, triggerProps, listboxProps] = useTriggerListboxSlots(props, baseState, ref, rootProps, triggerProps, listboxProps);

  rootProps.ref = useMergedRefs(rootProps.ref, rootRef);

  const calloutProps: SuggestionsComboboxSlotProps['callout'] = {
    dismissBehaviors: ['preventDismissOnClickOutside', 'preventDismissOnKeyDown'],
    onDismiss: onDismiss,
    target: rootProps.ref as React.RefObject<View>,
    ...props.callout,
  };

  const state: SuggestionsComboboxState = {
    root: rootProps,
    textInputContainer: { ...props.textInputContainer },
    focusBar: {
      style: focusBarDimensions,
      ...props.focusBar,
    },
    textInput: triggerProps,
    callout: calloutProps,
    listbox: listboxProps,
    disabled,
    iconSlot,
    listboxRef,
    ...baseState,
    ...pressable.state,
  };

  return state;
};
