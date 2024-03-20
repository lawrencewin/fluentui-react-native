import React from 'react';

import { Pressable, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { TextV1 as Text } from '@fluentui-react-native/text';
import type { SuggestionsComboboxOptionState } from './SuggestionsComboboxOption.types';

const Add16Regular = (props: SvgProps) => {
  const { fill: primaryFill = 'currentColor' } = props;
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
      <Path d="M8 2.5a.5.5 0 0 0-1 0V7H2.5a.5.5 0 0 0 0 1H7v4.5a.5.5 0 0 0 1 0V8h4.5a.5.5 0 0 0 0-1H8V2.5Z" fill={primaryFill} />
    </Svg>
  );
};

const Checkmark16Regular = (props: SvgProps) => {
  const { fill: primaryFill = 'currentColor' } = props;
  return (
    <Svg width={16} height="16" viewBox="0 0 16 16" {...props}>
      <Path
        d="M13.86 3.66a.5.5 0 0 1-.02.7l-7.93 7.48a.6.6 0 0 1-.84-.02L2.4 9.1a.5.5 0 0 1 .72-.7l2.4 2.44 7.65-7.2a.5.5 0 0 1 .7.02Z"
        fill={primaryFill}
      />
    </Svg>
  );
};

export const renderOption = (state: SuggestionsComboboxOptionState) => {
  const { root, icon, iconContainer, text, selected } = state;

  return (
    <Pressable {...root}>
      <View {...iconContainer}>{selected ? <Checkmark16Regular {...icon} /> : <Add16Regular {...icon} />}</View>
      <Text {...text}>{root.children as string}</Text>
    </Pressable>
  );
};
