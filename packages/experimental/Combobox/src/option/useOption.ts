import type { ForwardedRef } from 'react';
import { useEffect, useCallback, useMemo, useRef } from 'react';
import type { AccessibilityActionName, AccessibilityRole, View, AccessibilityActionEvent } from 'react-native';
import type { PressablePropsExtended } from '@fluentui-react-native/interactive-hooks';
import { useKeyDownProps, usePressableState } from '@fluentui-react-native/interactive-hooks';
import { useListboxContext } from '../context/ListboxContext';
import type { OptionValue } from '../utils/OptionCollection.types';
import type { SuggestionsComboboxOptionProps, SuggestionsComboboxOptionState } from './SuggestionsComboboxOption.types';
import { useMergedRefs } from '../../utils/useMergedRefs';

const triggerKeys = [' ', 'Enter'];
const accessibilityActions = [
  { name: 'AddToSelection' as AccessibilityActionName },
  { name: 'RemoveFromSelection' as AccessibilityActionName },
];

/**
 * Create the state required to render Option.
 *
 * The returned state can be modified with hooks such as useOptionStyles_unstable,
 * before being passed to renderOption_unstable.
 *
 * @param props - props from this instance of Option
 * @param ref - reference to root HTMLElement of Option
 */
export const useOption = (props: SuggestionsComboboxOptionProps, ref: ForwardedRef<View>): SuggestionsComboboxOptionState => {
  const { children, disabled, onPress: onPressOrig, ...rest } = props;
  const optionRef = useRef<View>(null);
  const optionText = children;
  const optionValue = optionText;

  // data used for context registration & events
  const optionData = useMemo<OptionValue>(() => ({ disabled, text: optionText }), [disabled, optionText]);

  // context values
  const listboxContext = useListboxContext();

  const focusVisible = listboxContext.focusVisible;
  const registerOption = listboxContext.registerOption;
  const selectedOptions = listboxContext.selectedOptions;
  const selected = !!optionValue && !!selectedOptions?.find((o) => o === optionValue);
  const selectOption = listboxContext.selectOption;
  const setActiveOption = listboxContext.setActiveOption;

  const active = listboxContext.activeOption?.text !== undefined && listboxContext.activeOption?.text === optionText;

  const onPress = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
    (event: any) => {
      if (disabled) {
        return;
      }

      // clicked option should always become active option
      setActiveOption(optionData);

      // handle selection change
      selectOption(event, optionData);

      onPressOrig?.(event);
    },
    [disabled, onPressOrig, optionData, selectOption, setActiveOption],
  );

  const onAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      switch (event.nativeEvent.actionName) {
        case 'AddToSelection':
        case 'RemoveFromSelection':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type is incorrect..suppressing to get to place where we can enable linting
          onPress(event as any);
          break;
      }
    },
    [onPress],
  );

  // register option data with context
  useEffect(() => {
    if (optionRef.current) {
      return registerOption(optionData, optionRef);
    }
    return;
  }, [optionData, registerOption]);

  const accessibilityProps = {
    accessibilityLabel: optionText,
    accessibilityActions: accessibilityActions,
    accessibilityState: { disabled, selected, multiselectable: true },
    accessibilityRole: 'menuitem' as AccessibilityRole,
    onAccessibilityAction: onAccessibilityAction,
  };

  const pressable = usePressableState({ ...rest, onPress } as PressablePropsExtended);
  const onKeyDownProps = useKeyDownProps(onPress, ...triggerKeys);

  return {
    root: {
      ref: useMergedRefs(optionRef, ref),
      ...accessibilityProps,
      ...pressable.props,
      ...onKeyDownProps,
      children: optionText,
    },
    icon: {
      ...props.icon,
    },
    iconContainer: {
      accessible: false,
      ...props.iconContainer,
    },
    text: {
      accessible: false,
      ...props.text,
    },
    ...pressable.state,
    active,
    disabled,
    focusVisible,
    selected,
  };
};
