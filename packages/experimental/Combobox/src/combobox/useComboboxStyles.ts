import type { TextStyle, ViewStyle } from 'react-native';

import { mergeStyles, useFluentTheme } from '@fluentui-react-native/framework';
import { themedStyleSheet } from '@fluentui-react-native/themed-stylesheet';
import type { Theme } from '@fluentui-react-native/theme-types';
import type { SuggestionsComboboxState } from './SuggestionsCombobox.types';

export interface ComboboxStyles {
  root: ViewStyle;
  textInput: TextStyle;
  textInputDisabled: TextStyle;
  textInputContainer: ViewStyle;
  textInputContainerDisabled: ViewStyle;
  textInputContainerFocused: ViewStyle;
  textInputFocused: ViewStyle;
}

const getComboboxStyles = themedStyleSheet<ComboboxStyles, Theme>((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  textInput: { color: theme.colors.neutralForeground1, fontSize: 14, flex: 1 },
  textInputDisabled: { color: theme.colors.neutralForegroundDisabled },
  textInputContainer: {
    alignItems: 'center',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    minHeight: 40,
    paddingStart: 8,
    borderWidth: 1,
    borderColor: theme.colors.neutralStroke1,
    backgroundColor: theme.colors.neutralBackground2,
  },
  textInputContainerFocused: {
    borderColor: theme.colors.neutralStroke1Selected,
  },
  textInputFocused: {
    backgroundColor: theme.colors.brandStroke1,
    height: 2,
    position: 'absolute',
  },
  textInputContainerDisabled: {
    borderColor: theme.colors.neutralBackgroundDisabled,
    backgroundColor: theme.colors.neutralBackgroundDisabled,
  },
}));

export const useComboboxStyles = (state: SuggestionsComboboxState) => {
  const { disabled, focused } = state;
  const theme = useFluentTheme();
  const styles = getComboboxStyles(theme);

  state.root.style = mergeStyles(styles.root, state.root.style);
  state.textInputContainer.style = mergeStyles(
    styles.textInputContainer,
    focused && !disabled && styles.textInputContainerFocused,
    disabled && styles.textInputContainerDisabled,
    state.textInputContainer.style,
  );
  state.focusBar.style = mergeStyles(focused && !disabled && styles.textInputFocused, state.focusBar.style);
  state.textInput.style = mergeStyles(styles.textInput, disabled && styles.textInputDisabled, state.textInput.style);
};
