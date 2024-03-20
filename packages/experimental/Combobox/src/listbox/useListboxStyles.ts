import { mergeStyles, useFluentTheme } from '@fluentui-react-native/framework';
import { themedStyleSheet } from '@fluentui-react-native/themed-stylesheet';
import type { Theme } from '@fluentui-react-native/theme-types';
import type { SuggestionsComboboxListboxState } from './SuggestionsComboboxListbox.types';

/**
 * Styles for the root slot
 */
const useStyles = themedStyleSheet((theme: Theme) => ({
  root: {
    backgroundColor: theme.colors.neutralBackground1,
    padding: 4,
  },
}));

/**
 * Apply styling to the Listbox slots based on the state
 */
export const useListboxStyles = (state: SuggestionsComboboxListboxState): SuggestionsComboboxListboxState => {
  const theme = useFluentTheme();
  const styles = useStyles(theme);

  state.root.style = mergeStyles(styles.root, state.root.style);

  return state;
};
