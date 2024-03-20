import React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { ListboxContextProvider } from '../context/ListboxContext';
import type { ListboxContextValues, SuggestionsComboboxListboxState } from './SuggestionsComboboxListbox.types';

export const renderListbox = (state: SuggestionsComboboxListboxState, value: ListboxContextValues) => {
  return (
    <ListboxContextProvider value={value.listbox}>
      <View {...(state.root as ViewProps)}>{state.root.children}</View>
    </ListboxContextProvider>
  );
};
