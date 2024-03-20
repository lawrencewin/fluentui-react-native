import { useCallback, useEffect, useState } from 'react';
import type { OptionValue } from './OptionCollection.types';
import type { SelectionProps, SelectionState } from './Selection.types';

export const useSelection = (props: SelectionProps): SelectionState => {
  const { defaultSelectedOptions, onOptionSelect, selectedOptions: selectedOptionsOrig } = props;

  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions ?? []);
  useEffect(() => {
    if (selectedOptionsOrig && selectedOptionsOrig !== selectedOptions) {
      setSelectedOptions(selectedOptionsOrig);
    }
  }, [selectedOptions, selectedOptionsOrig]);

  const selectOption = useCallback(
    (event: unknown, option: OptionValue) => {
      // if the option is disabled, do nothing
      if (option.disabled) {
        return;
      }

      // for single-select, always return the selected option
      let newSelection = [option.text];

      // toggle selected state of the option for multiselect
      const selectedIndex = selectedOptions.findIndex((o) => o === option.text);
      if (selectedIndex > -1) {
        // deselect option
        newSelection = [...selectedOptions.slice(0, selectedIndex), ...selectedOptions.slice(selectedIndex + 1)];
      } else {
        // select option
        newSelection = [...selectedOptions, option.text];
      }

      setSelectedOptions(newSelection);
      onOptionSelect?.(event, { optionText: option.text, selectedOptions: newSelection });
    },
    [onOptionSelect, selectedOptions, setSelectedOptions],
  );

  const clearSelection = (event: unknown) => {
    setSelectedOptions([]);
    onOptionSelect?.(event, { optionText: undefined, selectedOptions: [] });
  };

  return { clearSelection, selectOption, selectedOptions };
};
