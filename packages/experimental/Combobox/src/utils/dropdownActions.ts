/**
 * enum of actions available in any type of managed dropdown control
 * e.g. combobox, select, datepicker, menu
 */
export type DropdownActions =
  | 'Close'
  | 'CloseSelect'
  | 'First'
  | 'Last'
  | 'Next'
  | 'None'
  | 'Open'
  | 'PageDown'
  | 'PageUp'
  | 'Previous'
  | 'Select'
  | 'Tab'
  | 'Type';

export interface DropdownActionOptions {
  open?: boolean;
}

/**
 * Converts a keyboard interaction into a defined action
 */
export function getDropdownActionFromKey(
  e: { nativeEvent: { altKey: boolean; ctrlKey: boolean; key: string; metaKey: boolean } },
  options: DropdownActionOptions = {},
): DropdownActions {
  const { open = true } = options;
  const code = e.nativeEvent.key;
  const { altKey, ctrlKey, key, metaKey } = e.nativeEvent;

  // typing action occurs whether open or closed
  if (key.length === 1 && code !== 'Space' && !altKey && !ctrlKey && !metaKey) {
    return 'Type';
  }

  // handle opening the dropdown if closed
  if (!open) {
    if (code === 'ArrowDown' || code === 'ArrowUp') {
      return 'Open';
    }

    // if the dropdown is closed and an action did not match the above, do nothing
    return 'None';
  }

  if (code === 'Space' || code === 'Enter') {
    return 'Select';
  }
  if ((code === 'ArrowUp' && altKey) || code === 'Escape') {
    return 'Close';
  }

  // navigation interactions
  if (code === 'ArrowDown') {
    return 'Next';
  }
  if (code === 'ArrowUp') {
    return 'Previous';
  }
  if (code === 'Home') {
    return 'First';
  }
  if (code === 'End') {
    return 'Last';
  }
  if (code === 'PageUp') {
    return 'PageUp';
  }
  if (code === 'PageDown') {
    return 'PageDown';
  }
  if (code === 'Tab') {
    return 'Tab';
  }

  // if nothing matched, return none
  return 'None';
}

/**
 * Returns the requested option index from an action
 */
export function getIndexFromAction(action: DropdownActions, currentIndex: number, maxIndex: number): number {
  switch (action) {
    case 'Next':
      return currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
    case 'Previous':
      return currentIndex - 1 < 0 ? maxIndex : currentIndex - 1;
    case 'First':
      return 0;
    case 'Last':
      return maxIndex;
    case 'PageDown':
      return Math.min(maxIndex, currentIndex + 10);
    case 'PageUp':
      return Math.max(0, currentIndex - 10);
    default:
      return currentIndex;
  }
}
