# Flickon

A modern, interactive heart icon library for React with smooth animations, hover effects, and click-to-fill functionality built with TypeScript and React.

## Features

- ❤️ **Interactive Heart Icon**: Beautiful heart icon with multiple variants (outline, solid, filled)
- 🎯 **Click-to-Fill Animation**: Satisfying fill animation when clicked
- 🔍 **Hover Scale Effect**: Smooth scale animation on hover
- 🎨 **Multiple Variants**: Outline, solid, and filled heart styles
- ♿ **Accessible**: ARIA labels and keyboard navigation support
- 🎯 **TypeScript**: Full type safety and IntelliSense support
- 📦 **Lightweight**: Optimized SVG rendering and minimal bundle size
- 🎭 **Customizable**: Size, color, hover scale, and animation duration controls

## Installation

```bash
npm install flickon
# or
yarn add flickon
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { HeartIcon } from 'flickon';

function App() {
  const [liked, setLiked] = useState(false);

  return (
    <div>
      {/* Basic heart icon */}
      <HeartIcon size={24} color="#e74c3c" />
      
      {/* Interactive heart with like functionality */}
      <HeartIcon 
        size={32} 
        color="#e74c3c" 
        variant="outline"
        liked={liked}
        onLike={setLiked}
        hoverScale={1.2}
        fillDuration={400}
      />
      
      {/* Solid heart variant */}
      <HeartIcon 
        size={48} 
        color="#ff6b6b" 
        variant="solid"
      />
    </div>
  );
}
```

## Heart Icon Variants

### Available Variants

- `outline` - Heart with outline stroke (default)
- `solid` - Solid filled heart
- `filled` - Always filled heart (same as solid)

### Interactive Features

- **Hover Scale**: Heart scales up on hover (customizable scale factor)
- **Click-to-Fill**: Smooth fill animation when clicked
- **Like State**: Tracks liked/unliked state with visual feedback
- **Pulse Effect**: Subtle pulse animation for liked hearts

## API Reference

### HeartIcon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Icon size in pixels |
| `color` | `string` | `"#e74c3c"` | Heart color |
| `variant` | `HeartVariant` | `"outline"` | Heart style variant |
| `liked` | `boolean` | `false` | Whether the heart is liked/filled |
| `onLike` | `(liked: boolean) => void` | - | Callback when heart is clicked |
| `hoverScale` | `number` | `1.1` | Scale factor on hover |
| `fillDuration` | `number` | `300` | Animation duration for fill (ms) |
| `ariaLabel` | `string` | `"Heart icon"` | Accessibility label |
| `disabled` | `boolean` | `false` | Disable the heart |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Custom styles |
| `onClick` | `function` | - | Click handler |
| `onMouseEnter` | `function` | - | Mouse enter handler |
| `onMouseLeave` | `function` | - | Mouse leave handler |

### Heart Icon Usage Examples

```tsx
import { HeartIcon } from 'flickon';

// Basic outline heart
<HeartIcon size={24} color="#e74c3c" />

// Interactive like button
<HeartIcon 
  size={32} 
  variant="outline"
  liked={isLiked}
  onLike={setIsLiked}
  hoverScale={1.2}
  fillDuration={400}
/>

// Solid heart variant
<HeartIcon 
  size={48} 
  color="#ff6b6b" 
  variant="solid"
/>

// Disabled heart
<HeartIcon 
  size={24} 
  disabled 
  color="#ccc"
/>
```

## Advanced Usage

### Interactive Like Button

```tsx
import React, { useState } from 'react';
import { HeartIcon } from 'flickon';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const handleLike = (isLiked: boolean) => {
    setLiked(isLiked);
    setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <HeartIcon
        size={32}
        color="#e74c3c"
        variant="outline"
        liked={liked}
        onLike={handleLike}
        hoverScale={1.2}
        fillDuration={400}
        ariaLabel={liked ? "Unlike this post" : "Like this post"}
      />
      <span>{likeCount} likes</span>
    </div>
  );
}
```

### Custom Styling

```tsx
<HeartIcon
  size={48}
  color="#ff6b6b"
  variant="outline"
  style={{
    filter: 'drop-shadow(0 4px 8px rgba(255, 107, 107, 0.3))',
  }}
  className="custom-heart"
/>
```

### Event Handling

```tsx
<HeartIcon
  size={40}
  color="#e74c3c"
  onClick={(event) => {
    console.log('Heart clicked!', event);
  }}
  onMouseEnter={() => {
    console.log('Mouse entered heart');
  }}
  onMouseLeave={() => {
    console.log('Mouse left heart');
  }}
/>
```

### Accessibility

```tsx
<HeartIcon
  size={32}
  ariaLabel="Add to favorites"
  onClick={() => addToFavorites(itemId)}
  tabIndex={0}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      addToFavorites(itemId);
    }
  }}
/>
```

## Styling

### CSS Classes

The heart icon uses the following CSS classes for styling:

- `.flickon-heart-icon` - Main heart container
- `.flickon-heart--outline` - Outline variant
- `.flickon-heart--solid` - Solid variant  
- `.flickon-heart--filled` - Filled variant
- `.flickon-heart--liked` - Liked state
- `.flickon-heart--hovered` - Hover state
- `.flickon-heart--filling` - During fill animation
- `.flickon-heart--disabled` - Disabled state

### Custom CSS

```css
/* Custom heart styles */
.flickon-heart-icon {
  transition: transform 0.2s ease-in-out;
}

.flickon-heart--liked {
  filter: drop-shadow(0 2px 4px rgba(231, 76, 60, 0.3));
}

/* Pulse animation for liked hearts */
.flickon-heart-pulse {
  animation: flickon-heart-pulse 2s ease-in-out infinite;
}
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
- Interactive heart icon with multiple variants
- Click-to-fill animation with customizable duration
- Hover scale effect with customizable scale factor
- Like state management with visual feedback
- Pulse animation for liked hearts
- TypeScript support with full type safety
- Accessibility features (ARIA labels, keyboard navigation)
