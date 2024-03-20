import type { ComboboxContextValues, SuggestionsComboboxState } from '../combobox/SuggestionsCombobox.types';

export function useComboboxContextValues(state: SuggestionsComboboxState): ComboboxContextValues {
  const { activeOption, focusVisible, open, registerOption, selectedOptions, selectOption, setActiveOption, setOpen } = state;

  const combobox = {
    activeOption,
    focusVisible,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption,
    setOpen,
    initialized: true,
  };

  return { combobox };
}
