import React from 'react';
import { AnimatedIcon, AnimatedIconProps } from '@/components/AnimatedIcon';

export interface HomeIconProps extends Omit<AnimatedIconProps, 'name' | 'path'> {}

export const HomeIcon: React.FC<HomeIconProps> = (props) => {
  return (
    <AnimatedIcon
      name="home"
      path="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      viewBox="0 0 24 24"
      {...props}
    />
  );
};

export default HomeIcon;
