import type { ForwardedRef, PropsWithChildren } from 'react';
import type { View } from 'react-native';
import type { SuggestionsComboboxListboxProps, SuggestionsComboboxListboxState } from './SuggestionsComboboxListbox.types';
import { useOptionCollection } from '../utils/useOptionCollection';
import { useSelection } from '../utils/useSelection';
import { useComboboxContext } from '../context/ComboboxContext';

export const useListbox = (
  props: PropsWithChildren<SuggestionsComboboxListboxProps>,
  ref: ForwardedRef<View>,
): SuggestionsComboboxListboxState => {
  const optionCollection = useOptionCollection();
  const { clearSelection } = useSelection(props);

  // get state from parent combobox, if it exists
  const comboboxActiveOption = useComboboxContext().activeOption;
  const comboboxFocusVisible = useComboboxContext().focusVisible;
  const comboboxSelectedOptions = useComboboxContext().selectedOptions;
  const comboboxSelectOption = useComboboxContext().selectOption;
  const comboboxSetActiveOption = useComboboxContext().setActiveOption;

  // without a parent combobox context, provide values directly from Listbox
  const optionContextValues = {
    activeOption: comboboxActiveOption,
    focusVisible: comboboxFocusVisible,
    selectedOptions: comboboxSelectedOptions,
    selectOption: comboboxSelectOption,
    setActiveOption: comboboxSetActiveOption,
  };

  const state: SuggestionsComboboxListboxState = {
    root: {
      ref,
      ...props,
    },
    clearSelection,
    ...optionCollection,
    ...optionContextValues,
  };

  return state;
};
