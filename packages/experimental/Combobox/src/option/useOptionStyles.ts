import type { PressableProps } from 'react-native';
import type { TextProps } from '@fluentui-react-native/text';
import { mergeProps, mergeStyles, useFluentTheme } from '@fluentui-react-native/framework';
import { themedStyleSheet } from '@fluentui-react-native/themed-stylesheet';
import type { Theme } from '@fluentui-react-native/theme-types';
import type { SuggestionsComboboxOptionState } from './SuggestionsComboboxOption.types';

const textStyle: TextProps = {
  ellipsizeMode: 'tail',
  variant: 'bodyStandard',
};

const focusedRoot = {
  enableFocusRing: true,
} as PressableProps;

/**
 * Styles for the root slot
 */
const useStyles = themedStyleSheet((theme: Theme) => ({
  root: { flexDirection: 'row', minHeight: 32, alignItems: 'center', paddingHorizontal: 12, paddingVertical: 0, borderRadius: 4 },

  rootActive: {
    borderWidth: 2,
    borderColor: theme.colors.strokeFocus2,
    paddingHorizontal: 10,
  },
  rootHovered: {
    backgroundColor: theme.colors.neutralBackground1Hover,
  },
  rootPressed: {
    backgroundColor: theme.colors.neutralBackground1Pressed,
  },

  text: {
    color: theme.colors.neutralForeground1,
    marginStart: 12,
    marginTop: -2,
  },

  textDisabled: {
    color: theme.colors.neutralForegroundDisabled,
  },

  icon: {
    color: theme.colors.neutralForeground1,
  },

  iconDisabled: {
    color: theme.colors.neutralForegroundDisabled,
  },

  iconContainer: { minHeight: 16, minWidth: 16, alignItems: 'center', justifyContent: 'center' },
}));

/**
 * Apply styling to the Option slots based on the state
 */
export const useOptionStyles = (state: SuggestionsComboboxOptionState): SuggestionsComboboxOptionState => {
  const { active, disabled, focusVisible, hovered, pressed } = state;
  const theme = useFluentTheme();
  const styles = useStyles(theme);

  state.root = mergeProps(state.root, focusedRoot, {
    style: mergeStyles(
      styles.root,
      active && focusVisible && styles.rootActive,
      hovered && styles.rootHovered,
      pressed && styles.rootPressed,
      state.root.style,
    ),
  });

  if (state.icon) {
    state.icon.style = mergeStyles(styles.icon, disabled && styles.iconDisabled, state.icon.style);
  }

  if (state.iconContainer) {
    state.iconContainer.style = mergeStyles(styles.iconContainer, state.iconContainer.style);
  }

  if (state.text) {
    state.text = mergeProps(textStyle, { style: mergeStyles(styles.text, disabled && styles.textDisabled) }, state.text);
  }

  return state;
};
