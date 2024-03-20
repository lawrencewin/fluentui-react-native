import * as React from 'react';
import type { View } from 'react-native';
import { useListboxContextValues } from '../context/useListboxContextValues';
import { renderListbox } from './renderListbox';
import type { SuggestionsComboboxListboxProps } from './SuggestionsComboboxListbox.types';
import { useListbox } from './useListbox';
import { useListboxStyles } from './useListboxStyles';

export const SuggestionsComboboxListbox: React.ForwardRefExoticComponent<
  React.PropsWithChildren<SuggestionsComboboxListboxProps & React.RefAttributes<View>>
> = React.forwardRef<View, SuggestionsComboboxListboxProps>((props, ref) => {
  const state = useListbox(props, ref);
  const contextValues = useListboxContextValues(state);

  useListboxStyles(state);

  return renderListbox(state, contextValues);
});

SuggestionsComboboxListbox.displayName = 'SuggestionsComboboxListbox';
