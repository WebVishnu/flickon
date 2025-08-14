import React from 'react';
import { AnimatedIcon, AnimatedIconProps } from '@/components/AnimatedIcon';

export interface StarIconProps extends Omit<AnimatedIconProps, 'name' | 'path'> {}

export const StarIcon: React.FC<StarIconProps> = (props) => {
  return (
    <AnimatedIcon
      name="star"
      path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      viewBox="0 0 24 24"
      {...props}
    />
  );
};

export default StarIcon;
