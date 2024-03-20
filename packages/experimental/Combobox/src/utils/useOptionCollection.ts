import * as React from 'react';
import type { OptionCollectionState, OptionValue } from './OptionCollection.types';

/**
 * A hook for managing a collection of child Options
 */
export const useOptionCollection = (): OptionCollectionState => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
  const nodes = React.useRef<{ option: OptionValue; ref: React.RefObject<any> }[]>([]);

  const collectionAPI = React.useMemo(() => {
    const getCount = () => nodes.current.length;
    const getOptionAtIndex = (index: number) => nodes.current[index]?.option;
    const getIndexOfText = (text: string) => nodes.current.findIndex((node) => node.option.text === text);
    const getOptionByText = (text: string) => {
      const item = nodes.current.find((node) => node.option.text === text);
      return item?.option;
    };

    const getOptionsMatchingText = (matcher: (text: string) => boolean) => {
      return nodes.current.filter((node) => matcher(node.option.text)).map((node) => node.option);
    };

    return {
      getCount,
      getOptionAtIndex,
      getIndexOfText,
      getOptionByText,
      getOptionsMatchingText,
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Suppressing to get clean to enable lint on build
  const registerOption = React.useCallback((option: OptionValue, ref: React.RefObject<any>) => {
    const index = nodes.current.findIndex((node) => {
      if (!node.ref || !ref || !ref.current) {
        return false;
      }

      if (node.option.text === option.text) {
        return true;
      }

      return false;
    });

    // do not register the option if it already exists
    if (nodes.current[index]?.option.text !== option.text) {
      const newItem = { ref, option };

      // If an index is not found we will push the element to the end.
      if (index === -1) {
        nodes.current = [...nodes.current, newItem];
      } else {
        nodes.current.splice(index, 0, newItem);
      }
    }

    // return the unregister function
    return () => {
      nodes.current = nodes.current.filter((node) => node.option.text !== option.text);
    };
  }, []);

  return {
    ...collectionAPI,
    options: nodes.current.map((node) => node.option),
    registerOption,
  };
};
