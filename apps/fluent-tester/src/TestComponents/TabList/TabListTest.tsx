import React from 'react';
import { View } from 'react-native';

import { Divider } from '@fluentui-react-native/divider';
import { TextV1 as Text } from '@fluentui-react-native/text';

import { TabListE2ETest } from './TabListE2ETest';
import { TABLIST_TESTPAGE } from '../../../../E2E/src/index.consts';
import { stackStyle } from '../Common/styles';
import type { PlatformStatus, TestSection } from '../Test';
import { Test } from '../Test';

interface PositioningTestProps {
  left?: number;
  start?: number;
  absolutePosition?: boolean;
}
const PositioningTest1: React.FunctionComponent<PositioningTestProps> = (props) => {
  return (
    <View
      style={{
        backgroundColor: 'blue',
        width: 200,
        height: 40,
        marginBottom: 10,
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          width: 100,
          height: 20,
          backgroundColor: 'red',
          left: props.left,
          start: props.start,
          position: props.absolutePosition ? 'absolute' : 'relative',
        }}
      />
    </View>
  );
};

const TabListDefaultTest: React.FunctionComponent = () => {
  return (
    <View style={stackStyle}>
      <Text variant="subheaderSemibold">Child absolute positioned</Text>
      <Text>Left: 0</Text>
      <PositioningTest1 absolutePosition left={0} />
      <Text>Left: 50</Text>
      <PositioningTest1 absolutePosition left={50} />
      <Text>Start: 0</Text>
      <PositioningTest1 absolutePosition start={0} />
      <Text>Start: 50</Text>
      <PositioningTest1 absolutePosition start={50} />
      <Divider />
      <Text variant="subheaderSemibold">Child relative positioned</Text>
      <Text>Left: 0</Text>
      <PositioningTest1 left={0} />
      <Text>Left: 50</Text>
      <PositioningTest1 left={50} />
      <Text>Start: 0</Text>
      <PositioningTest1 start={0} />
      <Text>Start: 50</Text>
      <PositioningTest1 start={50} />
    </View>
  );
};

const sections: TestSection[] = [
  {
    name: 'TabList Controlled vs Uncontrolled',
    component: TabListDefaultTest,
    testID: TABLIST_TESTPAGE,
  },
];

const e2eSections: TestSection[] = [
  {
    name: 'E2E Tests',
    component: TabListE2ETest,
  },
];

export const TabListTest: React.FunctionComponent = () => {
  const status: PlatformStatus = {
    win32Status: 'Experimental',
    uwpStatus: 'Experimental',
    iosStatus: 'Backlog',
    macosStatus: 'Experimental',
    androidStatus: 'Backlog',
  };

  const description = 'With Tabs, users can navigate to another view.';

  return <Test name="TabsV1 Test" description={description} sections={sections} status={status} e2eSections={e2eSections} />;
};
