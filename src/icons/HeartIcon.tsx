import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeartIconProps, HeartVariant } from '@/types';
import '@/styles/heart.css';

type CSSVars = React.CSSProperties & { '--tx'?: string; '--ty'?: string };

const HEART_PATHS = {
  outline: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  solid: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  filled: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
};

export const HeartIcon: React.FC<HeartIconProps> = ({
  size = 24,
  color = '#e74c3c',
  className,
  style,
  variant = 'outline',
  liked = false,
  onLike,
  hoverScale = 1.1,
  fillDuration = 300,

  ariaLabel = 'Heart icon',
  disabled = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  viewBox = '0 0 24 24',
  ...props
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [isHovered, setIsHovered] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [sprinklesVisible, setSprinklesVisible] = useState(false);
  const [sprinkleBurstId, setSprinkleBurstId] = useState(0);
  const [glowVisible, setGlowVisible] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);

  type Sprinkle = {
    id: number;
    tx: number;
    ty: number;
    color: string;
    delay: number;
    r: number;
    scale: number;
    rotation: number;
  };
  const [sprinkles, setSprinkles] = useState<Sprinkle[]>([]);

  // Update internal state when prop changes
  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  // Handle click with fill animation
  const triggerSprinkleBurst = useCallback(() => {
    const sprinkleCount = Math.max(15, Math.min(28, Math.round(size * 0.8)));
    const next = generateSprinklesForSize(size, sprinkleCount);
    setSprinkles(next);
    setSprinklesVisible(true);
    setSprinkleBurstId(prev => prev + 1);
    setGlowVisible(true);
    window.setTimeout(() => setSprinklesVisible(false), 800);
    window.setTimeout(() => setGlowVisible(false), 600);
  }, [size]);

  const handleClick = (event: React.MouseEvent<SVGElement>) => {
    if (disabled) return;

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setIsFilling(true);
    setIsPopping(true);

    // Generate a sprinkle burst on each click
    triggerSprinkleBurst();

    // Trigger fill animation
    if (fillPathRef.current) {
      fillPathRef.current.style.transition = `fill ${fillDuration}ms ease-in-out`;
      fillPathRef.current.style.fill = newLikedState ? color : 'transparent';
    }

    // Call callbacks
    onLike?.(newLikedState);
    onClick?.(event);

    // Reset filling state after animation
    window.setTimeout(() => {
      setIsFilling(false);
    }, fillDuration);

    // End pop effect quickly
    window.setTimeout(() => {
      setIsPopping(false);
    }, 200);
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

  // Determine current variant and fill
  const getCurrentVariant = (): HeartVariant => {
    if (variant === 'filled' || isLiked) return 'filled';
    return variant;
  };

  const currentVariant = getCurrentVariant();
  const isFilled = currentVariant === 'filled' || isLiked;

  // Generate styles
  const iconStyles: React.CSSProperties = {
    width: size,
    height: size,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease-in-out`,
    transform: isHovered && !disabled ? `scale(${hoverScale})` : 'scale(1)',
    filter: isHovered && !disabled ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' : 'none',
    ...style,
  };

  // Generate classes
  const iconClasses = [
    'flickon-heart-icon',
    `flickon-heart--${currentVariant}`,
    isLiked && 'flickon-heart--liked',
    isHovered && 'flickon-heart--hovered',
    isFilling && 'flickon-heart--filling',
    disabled && 'flickon-heart--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <svg
      ref={svgRef}
      className={iconClasses}
      style={iconStyles}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label={ariaLabel}
      aria-hidden={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      <g className={isPopping ? 'flickon-heart-pop' : undefined}>
        {/* Glow effect */}
        {glowVisible && (
          <circle
            cx={12}
            cy={12}
            r={size * 0.6}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.4"
            className="flickon-heart-glow"
          />
        )}

        {/* Background heart (for outline variant) */}
        {variant === 'outline' && (
          <path
            d={HEART_PATHS.outline}
            fill="transparent"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Main heart path */}
        <path
          ref={fillPathRef}
          d={HEART_PATHS[currentVariant]}
          fill={isFilled ? color : 'transparent'}
          stroke={variant === 'outline' ? color : 'none'}
          strokeWidth={variant === 'outline' ? '1.5' : '0'}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: isFilling ? `fill ${fillDuration}ms ease-in-out` : 'fill 0.2s ease-in-out',
          }}
        />

        {/* Pulse effect for liked state */}
        {isLiked && (
          <path
            d={HEART_PATHS.filled}
            fill="transparent"
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.3"
            className="flickon-heart-pulse"
          />
        )}

        {/* Sprinkles burst */}
        {sprinklesVisible && (
          <g className="flickon-heart-sprinkles" aria-hidden="true">
            {sprinkles.map((s, index) => (
              <circle
                key={`${sprinkleBurstId}-${s.id}-${index}`}
                className="flickon-heart-sprinkle"
                cx={12}
                cy={12}
                r={s.r}
                fill={s.color}
                style={{
                  animationDelay: `${s.delay}ms`,
                  '--tx': `${s.tx}px`,
                  '--ty': `${s.ty}px`,
                  '--scale': s.scale,
                  '--rotation': s.rotation,
                } as CSSVars}
              />
            ))}
          </g>
        )}
      </g>
    </svg>
  );
};

export default HeartIcon;

// Helpers
function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSprinklesForSize(size: number, count: number): Array<{
  id: number;
  tx: number;
  ty: number;
  color: string;
  delay: number;
  r: number;
  scale: number;
  rotation: number;
}> {
  const colors = [
    '#ff6b9d', // soft pink
    '#4ecdc4', // teal
    '#45b7d1', // sky blue
    '#96ceb4', // mint green
    '#feca57', // warm yellow
    '#ff9ff3', // light purple
    '#54a0ff', // bright blue
    '#5f27cd', // deep purple
    '#00d2d3', // cyan
    '#ff9f43', // coral
  ] as const;

  const result: Array<{
    id: number;
    tx: number;
    ty: number;
    color: string;
    delay: number;
    r: number;
    scale: number;
    rotation: number;
  }> = [];

  const baseDistance = size * 0.4;
  for (let i = 0; i < count; i += 1) {
    const angle = randomBetween(0, Math.PI * 2);
    const distance = baseDistance * randomBetween(0.7, 1.3);
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    result.push({
      id: i,
      tx,
      ty,
      color: pick(colors),
      delay: Math.floor(randomBetween(0, 120)),
      r: randomBetween(Math.max(1.2, size * 0.025), Math.max(2, size * 0.045)),
      scale: randomBetween(0.8, 1.4),
      rotation: randomBetween(0, 360),
    });
  }

  return result;
}

