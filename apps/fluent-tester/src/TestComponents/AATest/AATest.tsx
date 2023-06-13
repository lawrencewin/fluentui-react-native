import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { Divider } from '@fluentui-react-native/divider';

import type { PlatformStatus, TestSection } from '../Test';
import { Test } from '../Test';

const styles = StyleSheet.create({
  view: {
    width: 200,
    height: 200,
    margin: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#606060',
  },
  pressable: {
    width: 150,
    height: 150,
    margin: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#606060',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const AATestSection: React.FunctionComponent = () => {
  const [view1Bg, setView1Bg] = React.useState({ backgroundColor: '#909090' });
  const [view2Bg, setView2Bg] = React.useState({ backgroundColor: '#909090' });

  const [pressable1Bg, setPressable1Bg] = React.useState({ backgroundColor: '#aa0000' });
  const [pressable2Bg, setPressable2Bg] = React.useState({ backgroundColor: '#aa0000' });

  const onTouchStart1 = React.useCallback(() => {
    setView1Bg({ backgroundColor: '#909000' });
  }, []);
  const onTouchEnd1 = React.useCallback(() => {
    setView1Bg({ backgroundColor: '#009090' });
  }, []);

  const onTouchStart2 = React.useCallback(() => {
    setView2Bg({ backgroundColor: '#909000' });
  }, []);
  const onTouchEnd2 = React.useCallback(() => {
    setView2Bg({ backgroundColor: '#009090' });
  }, []);

  const props1 = React.useMemo(() => ({ onTouchStart: onTouchStart1, onTouchEnd: onTouchEnd1 }), [onTouchStart1, onTouchEnd1]);
  const props2 = React.useMemo(() => ({ onTouchStart: onTouchStart2, onTouchEnd: onTouchEnd2 }), [onTouchStart2, onTouchEnd2]);

  const onPressIn1 = React.useCallback(() => setPressable1Bg({ backgroundColor: '#00aa00' }), []);
  const onPressIn2 = React.useCallback(() => setPressable2Bg({ backgroundColor: '#00aa00' }), []);

  const onPressOut1 = React.useCallback(() => setPressable1Bg({ backgroundColor: '#0000aa' }), []);
  const onPressOut2 = React.useCallback(() => setPressable2Bg({ backgroundColor: '#0000aa' }), []);

  const pprops1 = React.useMemo(() => ({ onPressIn: onPressIn1, onPressOut: onPressOut1 }), [onPressIn1, onPressOut1]);
  const pprops2 = React.useMemo(() => ({ onPressIn: onPressIn2, onPressOut: onPressOut2 }), [onPressIn2, onPressOut2]);

  return (
    <View>
      <View {...props1} style={[styles.view, view1Bg]} />
      <View {...props2} style={[styles.view, view2Bg]} />
      <Divider />
      <View style={styles.flex}>
        <Pressable {...pprops1} style={[styles.pressable, pressable1Bg]} />
        <Pressable {...pprops2} style={[styles.pressable, pressable2Bg]} />
      </View>
    </View>
  );
};

const sections: TestSection[] = [
  {
    name: 'Main Test',
    component: AATestSection,
  },
];

export const AATest: React.FunctionComponent = () => {
  const status: PlatformStatus = {
    win32Status: 'Experimental',
    uwpStatus: 'Experimental',
    iosStatus: 'Backlog',
    macosStatus: 'Experimental',
    androidStatus: 'Backlog',
  };

  const description = 'TEST.';

  return <Test name="AA Test" description={description} sections={sections} status={status} />;
};
