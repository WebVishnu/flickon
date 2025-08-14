import React, { useEffect, useRef, useState } from 'react';
import { IconComponentProps, AnimationType } from '@/types';
import { generateAnimationStyles, getAnimationConfig, injectKeyframes } from '@/animations';

// Simple clsx alternative for class name concatenation
const clsx = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface AnimatedIconProps extends IconComponentProps {
  /** Whether to automatically inject CSS keyframes */
  autoInjectKeyframes?: boolean;
  /** Whether to pause animation on hover */
  pauseOnHover?: boolean;
  /** Custom animation configuration */
  animationConfig?: {
    type: AnimationType;
    duration?: number;
    delay?: number;
    repeat?: number;
    ease?: string;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  };
  /** React children */
  children?: React.ReactNode;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
  animated = false,
  animation = 'fade',
  duration,
  delay,
  repeat,
  pauseOnHover = false,
  ariaLabel,
  disabled = false,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  path,
  viewBox = '0 0 24 24',
  autoInjectKeyframes = true,
  animationConfig,
  ...props
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Inject keyframes if needed
  useEffect(() => {
    if (autoInjectKeyframes && animated) {
      injectKeyframes();
    }
  }, [autoInjectKeyframes, animated]);

  // Handle animation pausing
  useEffect(() => {
    if (pauseOnHover && isHovered) {
      setIsPaused(true);
    } else if (pauseOnHover && !isHovered) {
      setIsPaused(false);
    }
  }, [pauseOnHover, isHovered]);

  // Generate animation styles
  const getAnimationStyle = (): string => {
    if (!animated || isPaused) return '';

    const config = animationConfig || {
      type: animation,
      duration: duration || undefined,
      delay: delay || undefined,
      repeat: repeat || undefined,
    };

    const finalConfig = getAnimationConfig(config.type, {
      duration: config.duration,
      delay: config.delay,
      repeat: config.repeat,
      ease: config.ease,
      direction: config.direction,
    });

    return generateAnimationStyles(finalConfig);
  };

  // Handle mouse events
  const handleMouseEnter = (event: React.MouseEvent<SVGElement>) => {
    setIsHovered(true);
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<SVGElement>) => {
    setIsHovered(false);
    onMouseLeave?.(event);
  };

  // Generate CSS classes
  const iconClasses = clsx(
    'animated-icon',
    animated && 'animated-icon--animated',
    disabled && 'animated-icon--disabled',
    isPaused && 'animated-icon--paused',
    className
  );

  // Generate inline styles
  const iconStyles: React.CSSProperties = {
    width: size,
    height: size,
    color,
    fill: 'currentColor',
    ...style,
  };

  // Add animation styles if animated
  const animationStyle = getAnimationStyle();
  if (animationStyle) {
    Object.assign(iconStyles, { animation: animationStyle });
  }

  // Accessibility attributes
  const accessibilityProps = {
    role: 'img',
    'aria-label': ariaLabel || `${name} icon`,
    'aria-hidden': disabled,
    tabIndex: disabled ? -1 : 0,
  };

  return (
    <svg
      ref={svgRef}
      className={iconClasses}
      style={iconStyles}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
      {...accessibilityProps}
    >
      {path && <path d={path} />}
      {props.children}
    </svg>
  );
};

export default AnimatedIcon;
