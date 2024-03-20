import type { RefAttributes } from 'react';
import type { PressableProps, View, ViewProps } from 'react-native';
import type { PressableState } from '@fluentui-react-native/interactive-hooks';
import type { TextProps } from '@fluentui-react-native/text';
import type { SvgProps } from 'react-native-svg';

export type SuggestionsComboboxOptionSlotProps = {
  root: PressableProps & RefAttributes<View>;
  iconContainer: ViewProps;
  icon: SvgProps;
  text: TextProps;
};

export type SuggestionsComboboxOptionProps = PressableProps &
  Partial<Omit<SuggestionsComboboxOptionSlotProps, 'root'>> & {
    /**
     * Sets an option to the `disabled` state.
     * Disabled options cannot be selected, but are still keyboard navigable
     */
    disabled?: boolean;
    children: string;
  };

/**
 * State used in rendering Option
 */
export type SuggestionsComboboxOptionState = PressableState &
  SuggestionsComboboxOptionSlotProps &
  Pick<SuggestionsComboboxOptionProps, 'disabled'> & {
    /* If true, this is the currently highlighted option */
    active: boolean;

    // Whether the keyboard focus outline style should be visible
    focusVisible: boolean;

    /* If true, the option is selected */
    selected: boolean;
  };
