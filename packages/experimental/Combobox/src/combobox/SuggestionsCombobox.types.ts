import type { RefAttributes } from 'react';
import type { TextInput, TextInputProps, View, ViewProps } from 'react-native';
import type { IViewProps } from '@fluentui-react-native/adapters';
import type { ICalloutProps, DirectionalHint } from '@fluentui-react-native/callout';
import type { PressableState } from '@fluentui-react-native/interactive-hooks';
import type { SelectionProps, SelectionState } from '../utils/Selection.types';
import type { SuggestionsComboboxListboxProps } from '../listbox/SuggestionsComboboxListbox.types';
import type { ComboboxContextValue } from '../context/ComboboxContext';
import type { OptionCollectionState, OptionValue } from '../utils/OptionCollection.types';

export type SuggestionsComboboxSlotProps = {
  root: IViewProps & RefAttributes<View>;
  textInputContainer: IViewProps & RefAttributes<View>;
  focusBar: ViewProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
  textInput: TextInputProps & { disabled?: boolean; keyDownEvents?: any[] } & RefAttributes<TextInput>;
  callout: ICalloutProps;
  listbox?: SuggestionsComboboxListboxProps & RefAttributes<View>;
};

/**
 * ComboboxBase Props
 * Shared types between Combobox and Dropdown components
 */
export type SuggestionsComboboxProps = TextInputProps &
  Partial<Omit<SuggestionsComboboxSlotProps, 'textInput'>> &
  SelectionProps & {
    /*
     * The primary slot, `textInput`, does not support children so we need to explicitly include it here.
     */
    children?: React.ReactNode;

    disabled?: boolean;

    /**
     * The default open state when open is uncontrolled
     */
    defaultOpen?: boolean;

    /**
     * The default value displayed in the trigger input or button when the combobox's value is uncontrolled
     */
    defaultValue?: string;

    iconSlot?: React.ReactElement;

    /**
     * Callback when the open/closed state of the dropdown changes
     */
    onOpenChange?: (e: unknown | null, data: ComboboxBaseOpenChangeData) => void;

    /**
     * Sets the open/closed state of the dropdown.
     * Use together with onOpenChange to fully control the dropdown's visibility
     */
    open?: boolean;

    /**
     * If set, the placeholder will show when no value is selected
     */
    placeholder?: string;

    /**
     * Configure the positioning of the combobox dropdown
     *
     * @defaultvalue below
     */
    positioning?: DirectionalHint;

    /**
     * The value displayed by the Combobox.
     * Use this with `onOptionSelect` to directly control the displayed value string
     */
    value?: string;
  };

export type SuggestionsComboboxState = PressableState &
  SuggestionsComboboxSlotProps &
  Required<Pick<SuggestionsComboboxProps, 'open'>> &
  Pick<SuggestionsComboboxProps, 'disabled' | 'iconSlot' | 'placeholder' | 'value'> &
  OptionCollectionState &
  SelectionState & {
    /* Option data for the currently focused option */
    activeOption?: OptionValue;

    // Whether the keyboard focus outline style should be visible
    focusVisible: boolean;

    // whether the combobox/dropdown currently has focus
    hasFocus: boolean;

    /* Whether the next blur event should be ignored, and the combobox/dropdown will not close.*/
    ignoreNextBlur: React.MutableRefObject<boolean>;

    listboxRef: React.RefObject<View>;

    setActiveOption(option?: OptionValue): void;

    setFocusVisible(focusVisible: boolean): void;

    setHasFocus(hasFocus: boolean): void;

    setOpen(event: unknown | null, newState: boolean): void;

    setValue(newValue: string | undefined): void;
  };

export type ComboboxBaseOpenChangeData = {
  open: boolean;
};

export type ComboboxContextValues = {
  combobox: ComboboxContextValue;
};
