// Icon exports
export { HomeIcon } from './HomeIcon';
export { HeartIcon } from './HeartIcon';
export { StarIcon } from './StarIcon';

// Icon registry for dynamic loading
export const iconRegistry = {
  home: () => import('./HomeIcon').then(module => module.HomeIcon),
  heart: () => import('./HeartIcon').then(module => module.HeartIcon),
  star: () => import('./StarIcon').then(module => module.StarIcon),
} as const;

// Icon metadata
export const iconMetadata = {
  home: {
    name: 'Home',
    category: 'navigation',
    tags: ['house', 'home', 'building'],
    description: 'A house icon representing home or main page',
  },
  heart: {
    name: 'Heart',
    category: 'emotions',
    tags: ['love', 'favorite', 'like'],
    description: 'A heart icon representing love or favorites',
  },
  star: {
    name: 'Star',
    category: 'rating',
    tags: ['favorite', 'rating', 'quality'],
    description: 'A star icon for ratings or favorites',
  },
} as const;

// Available icon names
export const availableIcons = Object.keys(iconRegistry) as Array<keyof typeof iconRegistry>;

// Icon categories
export const iconCategories = {
  navigation: ['home'],
  emotions: ['heart'],
  rating: ['star'],
} as const;
