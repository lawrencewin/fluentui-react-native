import type { RefAttributes } from 'react';
import type { IViewProps } from '@fluentui-react-native/adapters';
import type { View } from 'react-native';
import type { IWithPressableOptions } from '@fluentui-react-native/interactive-hooks';
import type { ListboxContextValue } from '../context/ListboxContext';
import type { OptionCollectionState, OptionValue } from '../utils/OptionCollection.types';
import type { SelectionProps, SelectionState } from '../utils/Selection.types';

export type SuggestionsComboboxListboxSlotProps = {
  root: IWithPressableOptions<IViewProps> & RefAttributes<View>;
};

export type SuggestionsComboboxListboxProps = IWithPressableOptions<IViewProps> & SelectionProps;

export type SuggestionsComboboxListboxState = SuggestionsComboboxListboxSlotProps &
  OptionCollectionState &
  SelectionState & {
    /* Option data for the currently highlighted option (not the selected option) */
    activeOption?: OptionValue;

    // Whether the keyboard focus outline style should be visible
    focusVisible: boolean;

    selectOption(event: unknown, option: OptionValue): void;

    setActiveOption(option?: OptionValue): void;
  };

export type ListboxContextValues = {
  listbox: ListboxContextValue;
};
