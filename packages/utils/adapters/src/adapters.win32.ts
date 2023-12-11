import type { ImageProps } from 'react-native';

import type { ITextWin32Props, IViewWin32Props } from '@office-iss/react-native-win32';

import type { IFilterMask } from './filter.types';

// export core interface types
export type ITextProps = ITextWin32Props;
export type IViewProps = IViewWin32Props;
export type IImageProps = ImageProps;

const _viewMask: IFilterMask<IViewProps> = {
  children: true,
  accessibilityAccessKey: true,
  accessibilityActions: true,
  accessibilityAnnotation: true,
  accessibilityControls: true,
  accessibilityDescribedBy: true,
  accessibilityDescription: true,
  accessibilityElementsHidden: true,
  accessibilityHint: true,
  accessibilityIgnoresInvertColors: true,
  accessibilityItemType: true,
  accessibilityLabel: true,
  accessibilityLabelledBy: true,
  accessibilityLanguage: true,
  accessibilityLevel: true,
  accessibilityLiveRegion: true,
  accessibilityPositionInSet: true,
  accessibilityRole: true,
  accessibilitySetSize: true,
  accessibilityState: true,
  accessibilityValue: true,
  accessibilityViewIsModal: true,
  accessible: true,
  animationClass: true,
  collapsable: true,
  cursor: true,
  enableFocusRing: true,
  focusable: true,
  hasTVPreferredFocus: false,
  hitSlop: true,
  id: true,
  importantForAccessibility: true,
  isTVSelectable: false,
  keyDownEvents: true,
  keyUpEvents: true,
  nativeID: true,
  needsOffscreenAlphaCompositing: true,
  onAccessibilityAction: true,
  onAccessibilityEscape: true,
  onAccessibilityTap: true,
  onBlur: true,
  onBlurCapture: true,
  onFocus: true,
  onFocusCapture: true,
  onKeyDown: true,
  onKeyDownCapture: true,
  onKeyUp: true,
  onKeyUpCapture: true,
  onLayout: true,
  onMagicTap: false,
  onMouseEnter: true,
  onMouseLeave: true,
  onMoveShouldSetResponder: true,
  onMoveShouldSetResponderCapture: true,
  onPointerCancel: true,
  onPointerCancelCapture: true,
  onPointerDown: true,
  onPointerDownCapture: true,
  onPointerEnter: true,
  onPointerEnterCapture: true,
  onPointerLeave: true,
  onPointerLeaveCapture: true,
  onPointerMove: true,
  onPointerMoveCapture: true,
  onPointerUp: true,
  onPointerUpCapture: true,
  onResponderEnd: true,
  onResponderGrant: true,
  onResponderMove: true,
  onResponderReject: true,
  onResponderRelease: true,
  onResponderStart: true,
  onResponderTerminate: true,
  onResponderTerminationRequest: true,
  onStartShouldSetResponder: true,
  onStartShouldSetResponderCapture: true,
  onTouchCancel: true,
  onTouchEnd: true,
  onTouchEndCapture: true,
  onTouchMove: true,
  onTouchStart: true,
  pointerEvents: true,
  removeClippedSubviews: true,
  renderToHardwareTextureAndroid: true,
  role: true,
  shouldRasterizeIOS: true,
  style: true,
  tabIndex: true,
  testID: true,
  tooltip: true,
  tvParallaxMagnification: false,
  tvParallaxProperties: false,
  tvParallaxShiftDistanceX: false,
  tvParallaxShiftDistanceY: false,
  tvParallaxTiltAngle: false,
  'aria-busy': true,
  'aria-checked': true,
  'aria-disabled': true,
  'aria-expanded': true,
  'aria-hidden': true,
  'aria-label': true,
  'aria-labelledby': true,
  'aria-live': true,
  'aria-modal': true,
  'aria-multiselectable': true,
  'aria-required': true,
  'aria-selected': true,
  'aria-valuemax': true,
  'aria-valuemin': true,
  'aria-valuenow': true,
  'aria-valuetext': true,
};

const _textMask: IFilterMask<ITextProps> = {
  children: true,
  accessibilityAccessKey: true,
  accessibilityActions: true,
  accessibilityAnnotation: true,
  accessibilityControls: true,
  accessibilityDescribedBy: true,
  accessibilityDescription: true,
  accessibilityElementsHidden: true,
  accessibilityHint: true,
  accessibilityIgnoresInvertColors: true,
  accessibilityItemType: true,
  accessibilityLabel: true,
  accessibilityLabelledBy: true,
  accessibilityLanguage: true,
  accessibilityLevel: true,
  accessibilityLiveRegion: true,
  accessibilityPositionInSet: true,
  accessibilityRole: true,
  accessibilitySetSize: true,
  accessibilityState: true,
  accessibilityValue: true,
  accessibilityViewIsModal: true,
  accessible: true,
  adjustsFontSizeToFit: false,
  allowFontScaling: true,
  android_hyphenationFrequency: false,
  dataDetectorType: false,
  disabled: true,
  dynamicTypeRamp: false,
  ellipsizeMode: true,
  focusable: true,
  id: true,
  importantForAccessibility: true,
  keyDownEvents: true,
  keyUpEvents: true,
  lineBreakMode: true,
  lineBreakStrategyIOS: true,
  maxFontSizeMultiplier: true,
  minimumFontScale: true,
  nativeID: true,
  numberOfLines: true,
  onAccessibilityAction: true,
  onAccessibilityEscape: true,
  onAccessibilityTap: true,
  onBlur: true,
  onBlurCapture: true,
  onFocus: true,
  onFocusCapture: true,
  onKeyDown: true,
  onKeyDownCapture: true,
  onKeyUp: true,
  onKeyUpCapture: true,
  onLayout: true,
  onLongPress: true,
  onMagicTap: false,
  onPress: true,
  onPressIn: true,
  onPressOut: true,
  onTextLayout: true,
  role: true,
  selectable: true,
  selectionColor: true,
  style: true,
  suppressHighlighting: true,
  testID: true,
  textBreakStrategy: true,
  textStyle: true,
  tooltip: true,
  'aria-busy': true,
  'aria-checked': true,
  'aria-disabled': true,
  'aria-expanded': true,
  'aria-hidden': true,
  'aria-label': true,
  'aria-labelledby': true,
  'aria-live': true,
  'aria-modal': true,
  'aria-selected': true,
  'aria-valuemax': true,
  'aria-valuemin': true,
  'aria-valuenow': true,
  'aria-valuetext': true,
};

const _imageMask: IFilterMask<IImageProps> = {
  children: true,
  accessibilityActions: true,
  accessibilityElementsHidden: true,
  accessibilityHint: true,
  accessibilityIgnoresInvertColors: true,
  accessibilityLabel: true,
  accessibilityLabelledBy: true,
  accessibilityLanguage: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityState: true,
  accessibilityValue: true,
  accessibilityViewIsModal: true,
  accessible: true,
  alt: true,
  blurRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  capInsets: true,
  crossOrigin: true,
  defaultSource: true,
  fadeDuration: true,
  height: true,
  id: true,
  importantForAccessibility: true,
  loadingIndicatorSource: true,
  nativeID: true,
  onAccessibilityAction: true,
  onAccessibilityEscape: true,
  onAccessibilityTap: true,
  onError: true,
  onLayout: true,
  onLoad: true,
  onLoadEnd: true,
  onLoadStart: true,
  onMagicTap: true,
  onPartialLoad: true,
  onProgress: true,
  progressiveRenderingEnabled: true,
  referrerPolicy: true,
  resizeMethod: true,
  resizeMode: true,
  role: true,
  source: true,
  src: true,
  srcSet: true,
  style: true,
  testID: true,
  tintColor: true,
  width: true,
  'aria-busy': true,
  'aria-checked': true,
  'aria-disabled': true,
  'aria-expanded': true,
  'aria-hidden': true,
  'aria-label': true,
  'aria-labelledby': true,
  'aria-live': true,
  'aria-modal': true,
  'aria-selected': true,
  'aria-valuemax': true,
  'aria-valuemin': true,
  'aria-valuenow': true,
  'aria-valuetext': true,
};

export function filterViewProps(propName: string): boolean {
  return _viewMask[propName];
}

export function filterTextProps(propName: string): boolean {
  return _textMask[propName];
}

export function filterImageProps(propName: string): boolean {
  return _imageMask[propName];
}
