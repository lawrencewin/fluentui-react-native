/** @jsx withSlots */
import { Children, ReactNode } from 'react';
import { View, I18nManager } from 'react-native';
import { badgeName, BadgeType, BadgeProps } from './Badge.types';
import { TextV1 as Text } from '@fluentui-react-native/text';
import { compose, withSlots, UseSlots, mergeProps } from '@fluentui-react-native/framework';
import { Icon } from '@fluentui-react-native/icon';
import { createIconProps } from '@fluentui-react-native/interactive-hooks';
import { stylingSettings } from './Badge.styling';
import { useBadge } from './useBadge';

export const badgeLookup = (layer: string, userProps: BadgeProps): boolean => {
  return (
    userProps[layer] ||
    layer === userProps['appearance'] ||
    layer === userProps['size'] ||
    (!userProps['size'] && layer === 'large') ||
    layer === userProps['shape'] ||
    (!userProps['shape'] && layer === 'circular') ||
    layer === userProps['badgeColor'] ||
    (I18nManager.isRTL && layer === 'rtl')
  );
};

export const Badge = compose<BadgeType>({
  displayName: badgeName,
  ...stylingSettings,
  slots: {
    root: View,
    icon: Icon,
    text: Text,
  },
  useRender: (userProps: BadgeProps, useSlots: UseSlots<BadgeType>) => {
    const iconProps = createIconProps(userProps.icon);
    const badge = useBadge(userProps);

    const Slots = useSlots(userProps, (layer) => badgeLookup(layer, userProps));

    return (final: BadgeProps, ...children: ReactNode[]) => {
      const { icon, iconPosition, size, ...mergedProps } = mergeProps(badge, final);
      const showContent = size !== 'tiny' && size !== 'extraSmall';
      const showIcon = size !== 'tiny';

      return (
        <Slots.root {...mergedProps}>
          {icon && showIcon && iconPosition === 'before' && <Slots.icon accessible={false} {...iconProps} />}
          {showContent &&
            Children.map(children, (child, i) => (typeof child === 'string' ? <Slots.text key={`text-${i}`}>{child}</Slots.text> : child))}
          {icon && showIcon && iconPosition === 'after' && <Slots.icon accessible={false} {...iconProps} />}
        </Slots.root>
      );
    };
  },
});

export default Badge;