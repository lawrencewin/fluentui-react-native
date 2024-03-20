import { createContext, useContext } from 'react';
import type { SuggestionsComboboxListboxState } from '../listbox/SuggestionsComboboxListbox.types';

/**
 * Context shared with all Listbox Options
 */
export type ListboxContextValue = Pick<
  SuggestionsComboboxListboxState,
  'activeOption' | 'focusVisible' | 'registerOption' | 'selectedOptions' | 'selectOption' | 'setActiveOption'
>;

export const ListboxContext = createContext<ListboxContextValue>({
  activeOption: undefined,
  focusVisible: false,
  registerOption() {
    return () => undefined;
  },
  selectedOptions: [],
  selectOption() {
    // noop
  },
  setActiveOption() {
    // noop
  },
});

export const ListboxContextProvider = ListboxContext.Provider;
export const useListboxContext = () => useContext(ListboxContext);
