export type OptionValue = {
  disabled?: boolean;
  text: string;
};

export type OptionCollectionState = {
  /** The total number of options in the collection. */
  getCount: () => number;

  /** Returns the index of an option by key. */
  getIndexOfText(text: string): number;

  /** Returns the option data for the nth option. */
  getOptionAtIndex(index: number): OptionValue | undefined;

  /** Returns the option data by key. */
  getOptionByText(text: string): OptionValue | undefined;

  /** Returns an array of options filtered by a value matching function against the option's text string. */
  getOptionsMatchingText(matcher: (text: string) => boolean): OptionValue[];

  /** The unordered option data. */
  options: OptionValue[];

  /* A function that child options call to register their values. Returns a function to unregister the option. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
  registerOption: (option: OptionValue, ref: React.RefObject<any>) => () => void;
};
