import { createContext, useContext } from 'react';
import type { SuggestionsComboboxState } from '../combobox/SuggestionsCombobox.types';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = Pick<
  SuggestionsComboboxState,
  'activeOption' | 'focusVisible' | 'open' | 'registerOption' | 'selectedOptions' | 'selectOption' | 'setActiveOption' | 'setOpen'
> & { initialized: boolean };

export const ComboboxContext = createContext<ComboboxContextValue>({
  activeOption: undefined,
  focusVisible: false,
  open: false,
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
  setOpen() {
    // noop
  },
  initialized: false,
});

export const ComboboxProvider = ComboboxContext.Provider;
export const useComboboxContext = () => useContext(ComboboxContext);
