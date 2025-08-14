export interface IconProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon */
  color?: string;
  /** CSS class name for additional styling */
  className?: string;
  /** Whether the icon is currently animated */
  animated?: boolean;
  /** Animation type to apply */
  animation?: AnimationType;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Number of times to repeat the animation (-1 for infinite) */
  repeat?: number;
  /** Whether to pause animation on hover */
  pauseOnHover?: boolean;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
  /** Whether the icon is disabled */
  disabled?: boolean;
  /** Custom CSS styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  /** Mouse enter handler */
  onMouseEnter?: (event: React.MouseEvent<SVGElement>) => void;
  /** Mouse leave handler */
  onMouseLeave?: (event: React.MouseEvent<SVGElement>) => void;
}

export type AnimationType = 
  | 'fade'
  | 'slide'
  | 'bounce'
  | 'rotate'
  | 'scale'
  | 'shake'
  | 'pulse'
  | 'wiggle'
  | 'flip'
  | 'none';

export interface AnimationConfig {
  type: AnimationType;
  duration: number;
  delay: number;
  repeat: number;
  ease?: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export interface IconCategory {
  name: string;
  description: string;
  icons: string[];
}

export interface IconMetadata {
  name: string;
  category: string;
  tags: readonly string[];
  description: string;
  author?: string;
  version?: string;
}

export interface IconData {
  name: string;
  path: string;
  viewBox: string;
  metadata?: IconMetadata;
}

export interface OfflineStorage {
  /** Store icon data locally */
  storeIconData: (data: IconData | IconData[]) => void | Promise<void>;
  /** Retrieve icon data from local storage */
  getIconData: () => IconData | IconData[] | null | Promise<IconData | IconData[] | null>;
  /** Check if data exists in local storage */
  hasIconData: () => boolean | Promise<boolean>;
  /** Clear stored icon data */
  clearIconData: () => void | Promise<void>;
}

export interface IconLibraryConfig {
  /** Base URL for fetching icon data */
  baseUrl?: string;
  /** Offline storage configuration */
  offlineStorage?: OfflineStorage;
  /** Default animation settings */
  defaultAnimation?: AnimationConfig;
  /** Default icon size */
  defaultSize?: number;
  /** Default icon color */
  defaultColor?: string;
  /** Whether to enable offline mode by default */
  enableOfflineMode?: boolean;
}

export type HeartVariant = 'outline' | 'solid' | 'filled';

export interface IconComponentProps extends IconProps {
  /** Name of the icon */
  name: string;
  /** SVG path data */
  path?: string;
  /** View box for the SVG */
  viewBox?: string;
  /** Whether to use offline data */
  useOfflineData?: boolean;
}

export interface HeartIconProps extends Omit<IconComponentProps, 'name'> {
  /** Heart variant */
  variant?: HeartVariant;
  /** Whether the heart is liked/filled */
  liked?: boolean;
  /** Callback when heart is clicked */
  onLike?: (liked: boolean) => void;
  /** Scale factor on hover */
  hoverScale?: number;
  /** Animation duration for fill animation */
  fillDuration?: number;
}
