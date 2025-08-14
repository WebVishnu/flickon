# Flickon

A modern, scalable animated icons library for React with smooth animations and offline support built with TypeScript and React.

## Features

- 🎨 **Beautiful Animations**: 10+ built-in animation types (fade, bounce, rotate, scale, etc.)
- 🔧 **Highly Customizable**: Size, color, duration, delay, and repeat controls
- 📱 **Offline-First**: Local storage support for icon data and preferences
- ♿ **Accessible**: ARIA labels and keyboard navigation support
- 🎯 **TypeScript**: Full type safety and IntelliSense support
- 📦 **Tree Shakeable**: Only import what you need
- 🚀 **Performance**: Optimized SVG rendering and minimal bundle size

## Installation

```bash
npm install flickon
# or
yarn add flickon
```

## Quick Start

```tsx
import React from 'react';
import { AnimatedIcon, HomeIcon, HeartIcon } from 'flickon';

function App() {
  return (
    <div>
      {/* Basic usage */}
      <HomeIcon size={24} color="#007bff" />
      
      {/* With animation */}
      <HeartIcon 
        size={32} 
        color="#e74c3c" 
        animated 
        animation="bounce" 
        duration={1000}
      />
      
      {/* Custom animated icon */}
      <AnimatedIcon
        name="custom"
        path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        size={48}
        animated
        animation="rotate"
        pauseOnHover
      />
    </div>
  );
}
```

## Available Icons

### Pre-built Icons

- `HomeIcon` - Navigation icon
- `HeartIcon` - Love/favorite icon  
- `StarIcon` - Rating/quality icon

### Animation Types

- `fade` - Fade in/out
- `slide` - Slide horizontally
- `bounce` - Bounce up and down
- `rotate` - Continuous rotation
- `scale` - Scale up/down
- `shake` - Shake horizontally
- `pulse` - Gentle pulsing
- `wiggle` - Wiggle rotation
- `flip` - 3D flip animation
- `none` - No animation

## API Reference

### AnimatedIcon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Icon name for accessibility |
| `size` | `number` | `24` | Icon size in pixels |
| `color` | `string` | `"currentColor"` | Icon color |
| `animated` | `boolean` | `false` | Whether to animate the icon |
| `animation` | `AnimationType` | `"fade"` | Animation type to apply |
| `duration` | `number` | - | Animation duration in ms |
| `delay` | `number` | `0` | Animation delay in ms |
| `repeat` | `number` | `-1` | Number of repetitions (-1 for infinite) |
| `pauseOnHover` | `boolean` | `false` | Pause animation on hover |
| `ariaLabel` | `string` | - | Accessibility label |
| `disabled` | `boolean` | `false` | Disable the icon |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Custom styles |
| `onClick` | `function` | - | Click handler |
| `onMouseEnter` | `function` | - | Mouse enter handler |
| `onMouseLeave` | `function` | - | Mouse leave handler |

### Icon Library

```tsx
import { IconLibrary, defaultIconLibrary } from 'flickon';

// Create custom library instance
const iconLibrary = new IconLibrary({
  enableOfflineMode: true,
  defaultSize: 32,
  defaultColor: '#333',
});

// Get icon component dynamically
const IconComponent = await iconLibrary.getIcon('home');

// Check if icon exists
const hasIcon = iconLibrary.hasIcon('heart');

// Get available icons
const availableIcons = iconLibrary.getAvailableIcons();
```

### Offline Storage

```tsx
import { 
  LocalStorageOfflineStorage, 
  IndexedDBOfflineStorage 
} from 'flickon';

// Use localStorage (default)
const localStorage = new LocalStorageOfflineStorage();

// Use IndexedDB for larger data
const indexedDB = new IndexedDBOfflineStorage();

// Store icon data
localStorage.storeIconData(iconData);

// Retrieve data
const data = localStorage.getIconData();

// Check if data exists
const hasData = localStorage.hasIconData();
```

## Advanced Usage

### Custom Animation Configuration

```tsx
<HeartIcon
  animated
  animationConfig={{
    type: 'bounce',
    duration: 1500,
    delay: 200,
    repeat: 3,
    ease: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    direction: 'alternate',
  }}
/>
```

### Event Handling

```tsx
<StarIcon
  size={40}
  animated
  animation="pulse"
  onClick={(event) => {
    console.log('Icon clicked!', event);
  }}
  onMouseEnter={() => {
    console.log('Mouse entered icon');
  }}
  onMouseLeave={() => {
    console.log('Mouse left icon');
  }}
/>
```

### Accessibility

```tsx
<HomeIcon
  size={32}
  ariaLabel="Navigate to home page"
  onClick={() => navigate('/')}
  tabIndex={0}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate('/');
    }
  }}
/>
```

### Custom Icon with SVG Path

```tsx
<AnimatedIcon
  name="custom-shape"
  path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
  viewBox="0 0 24 24"
  size={48}
  color="#4CAF50"
  animated
  animation="scale"
/>
```

## Configuration

### Library Configuration

```tsx
import { IconLibrary } from 'flickon';

const iconLibrary = new IconLibrary({
  baseUrl: 'https://your-api.com/icons',
  enableOfflineMode: true,
  defaultSize: 24,
  defaultColor: '#333',
  defaultAnimation: {
    type: 'fade',
    duration: 1000,
    delay: 0,
    repeat: -1,
  },
});
```

### Global Styles

The library automatically injects CSS keyframes for animations. You can disable this:

```tsx
<AnimatedIcon
  name="home"
  autoInjectKeyframes={false}
  // ... other props
/>
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- Core animated icon component
- 10 animation types
- Offline storage support
- TypeScript support
- Accessibility features
