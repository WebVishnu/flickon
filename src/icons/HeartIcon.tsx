import React from 'react';
import { AnimatedIcon, AnimatedIconProps } from '@/components/AnimatedIcon';

export interface HeartIconProps extends Omit<AnimatedIconProps, 'name' | 'path'> {}

export const HeartIcon: React.FC<HeartIconProps> = (props) => {
  return (
    <AnimatedIcon
      name="heart"
      path="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      viewBox="0 0 24 24"
      {...props}
    />
  );
};

export default HeartIcon;
