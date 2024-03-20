import { forwardRef } from 'react';

import type { View } from 'react-native';
import { renderOption } from './renderOption';
import type { SuggestionsComboboxOptionProps } from './SuggestionsComboboxOption.types';
import { useOption } from './useOption';
import { useOptionStyles } from './useOptionStyles';

export const SuggestionsComboboxOption = forwardRef<View, SuggestionsComboboxOptionProps>((props, ref) => {
  const state = useOption(props, ref);
  useOptionStyles(state);

  return renderOption(state);
});

SuggestionsComboboxOption.displayName = 'SuggestionsComboboxOption';
