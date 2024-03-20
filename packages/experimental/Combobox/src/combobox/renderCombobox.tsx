import React from 'react';
import type { ViewProps } from 'react-native';
import { TextInput, View } from 'react-native';
import { Callout } from '@fluentui-react-native/callout';
import { SuggestionsComboboxListbox } from '../listbox/SuggestionsComboboxListbox';
import type { ComboboxContextValues, SuggestionsComboboxState } from './SuggestionsCombobox.types';
import { ComboboxContext } from '../context/ComboboxContext';

export const renderCombobox = (state: SuggestionsComboboxState, contextValues: ComboboxContextValues) => {
  return (
    <ComboboxContext.Provider value={contextValues.combobox}>
      <View {...(state.root as ViewProps)}>
        <View {...(state.textInputContainer as ViewProps)}>
          <TextInput {...state.textInput} />
          {state.iconSlot}
        </View>
        <View {...state.focusBar} />
      </View>
      {state.open && state.listbox && (
        <Callout {...state.callout}>
          <SuggestionsComboboxListbox {...state.listbox} ref={state.listboxRef} />
        </Callout>
      )}
    </ComboboxContext.Provider>
  );
};
