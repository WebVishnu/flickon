// Heart Icon export
export { HeartIcon } from './HeartIcon';
export type { HeartIconProps, HeartVariant } from '@/types';

// Heart icon registry for dynamic loading
export const iconRegistry = {
  heart: () => import('./HeartIcon').then(module => module.HeartIcon),
} as const;

// Heart icon metadata
export const iconMetadata = {
  heart: {
    name: 'Heart',
    category: 'emotions',
    tags: ['heart', 'love', 'like', 'favorite', 'emotion'],
    description: 'A heart icon representing love, like, or favorite actions',
  },
} as const;

// Available icons
export const availableIcons = ['heart'] as const;

// Icon categories
export const iconCategories = {
  emotions: {
    name: 'Emotions',
    description: 'Icons representing emotions and feelings',
    icons: ['heart'],
  },
} as const;


