import type { ListboxContextValues, SuggestionsComboboxListboxState } from '../listbox/SuggestionsComboboxListbox.types';
import { useComboboxContext } from './ComboboxContext';

export function useListboxContextValues(state: SuggestionsComboboxListboxState): ListboxContextValues {
  const hasComboboxContext = useComboboxContext().initialized;
  const { activeOption, focusVisible, registerOption, selectedOptions, selectOption, setActiveOption } = state;

  const comboboxRegisterOption = useComboboxContext().registerOption;

  const registerOptionValue = hasComboboxContext ? comboboxRegisterOption : registerOption;

  const listbox = {
    activeOption,
    focusVisible,
    registerOption: registerOptionValue,
    selectedOptions,
    selectOption,
    setActiveOption,
  };

  return { listbox };
}
