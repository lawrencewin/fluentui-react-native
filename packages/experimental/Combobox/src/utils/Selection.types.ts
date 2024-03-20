import type { OptionValue } from './OptionCollection.types';

/*
 * Data for the onOptionSelect callback.
 */
export type OptionOnSelectData = {
  optionText?: string;
  selectedOptions: string[];
};

export type SelectionProps = {
  /**
   * For an uncontrolled component, sets the initial selection.
   * If this is set, the `defaultValue` prop MUST also be set.
   */
  defaultSelectedOptions?: string[];

  /* Callback when an option is selected */
  onOptionSelect?: (event: unknown, data: OptionOnSelectData) => void;

  /**
   * An array of selected option keys.
   * Use this with `onOptionSelect` to directly control the selected option(s)
   * If this is set, the `value` prop MUST also be controlled.
   */
  selectedOptions?: string[];
};

/* Values returned by the useSelection hook */
export type SelectionState = {
  clearSelection: (event: unknown) => void;
  selectedOptions: string[];
  selectOption: (event: unknown, option: OptionValue) => void;
};
