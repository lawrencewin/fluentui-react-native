import React from 'react';
import type { TextInput } from 'react-native';
import { useComboboxStyles } from './useComboboxStyles';
import type { SuggestionsComboboxProps } from './SuggestionsCombobox.types';
import { renderCombobox } from './renderCombobox';
import { useCombobox } from './useCombobox';
import { useComboboxContextValues } from '../context/useComboboxContextValues';

export const SuggestionsCombobox: React.ForwardRefExoticComponent<
  React.PropsWithChildren<SuggestionsComboboxProps & React.RefAttributes<TextInput>>
> = React.forwardRef<TextInput, SuggestionsComboboxProps>((props: SuggestionsComboboxProps, ref) => {
  const state = useCombobox(props, ref);
  const contextValues = useComboboxContextValues(state);

  useComboboxStyles(state);

  // memo the later object
  return renderCombobox(state, contextValues);
});

SuggestionsCombobox.displayName = 'SuggestionsCombobox';
