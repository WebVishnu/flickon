import { AnimationType, AnimationConfig } from '@/types';

export const ANIMATION_DEFAULTS: Record<AnimationType, AnimationConfig> = {
  fade: {
    type: 'fade',
    duration: 1000,
    delay: 0,
    repeat: -1,
    ease: 'ease-in-out',
    direction: 'alternate',
  },
  slide: {
    type: 'slide',
    duration: 800,
    delay: 0,
    repeat: -1,
    ease: 'ease-in-out',
    direction: 'alternate',
  },
  bounce: {
    type: 'bounce',
    duration: 1000,
    delay: 0,
    repeat: -1,
    ease: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    direction: 'normal',
  },
  rotate: {
    type: 'rotate',
    duration: 2000,
    delay: 0,
    repeat: -1,
    ease: 'linear',
    direction: 'normal',
  },
  scale: {
    type: 'scale',
    duration: 600,
    delay: 0,
    repeat: -1,
    ease: 'ease-in-out',
    direction: 'alternate',
  },
  shake: {
    type: 'shake',
    duration: 500,
    delay: 0,
    repeat: -1,
    ease: 'ease-in-out',
    direction: 'normal',
  },
  pulse: {
    type: 'pulse',
    duration: 1500,
    delay: 0,
    repeat: -1,
    ease: 'ease-in-out',
    direction: 'alternate',
  },
  wiggle: {
    type: 'wiggle',
    duration: 1000,
    delay: 0,
    repeat: -1,
    ease: 'ease-in-out',
    direction: 'alternate',
  },
  flip: {
    type: 'flip',
    duration: 1200,
    delay: 0,
    repeat: -1,
    ease: 'ease-in-out',
    direction: 'alternate',
  },
  none: {
    type: 'none',
    duration: 0,
    delay: 0,
    repeat: 0,
    ease: 'linear',
    direction: 'normal',
  },
};

export const generateAnimationStyles = (config: AnimationConfig): string => {
  if (config.type === 'none') return '';
  
  const duration = config.duration / 1000;
  const delay = config.delay / 1000;
  const repeat = config.repeat === -1 ? 'infinite' : config.repeat;
  
  return `
    animation: ${config.type} ${duration}s ${config.ease} ${delay}s ${repeat} ${config.direction};
  `;
};

export const generateKeyframes = (): string => `
  @keyframes fade {
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
  }

  @keyframes slide {
    0% { transform: translateX(0); }
    50% { transform: translateX(10px); }
    100% { transform: translateX(0); }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes scale {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes wiggle {
    0%, 7% { transform: rotateZ(0); }
    15% { transform: rotateZ(-15deg); }
    20% { transform: rotateZ(10deg); }
    25% { transform: rotateZ(-10deg); }
    30% { transform: rotateZ(6deg); }
    35% { transform: rotateZ(-4deg); }
    40%, 100% { transform: rotateZ(0); }
  }

  @keyframes flip {
    0% { transform: perspective(400px) rotateY(0); }
    40% { transform: perspective(400px) rotateY(90deg); }
    60% { transform: perspective(400px) rotateY(180deg); }
    80% { transform: perspective(400px) rotateY(270deg); }
    100% { transform: perspective(400px) rotateY(360deg); }
  }
`;

export const injectKeyframes = (): void => {
  if (typeof document === 'undefined') return;
  
  const existingStyle = document.getElementById('animated-icons-keyframes');
  if (existingStyle) return;
  
  const style = document.createElement('style');
  style.id = 'animated-icons-keyframes';
  style.textContent = generateKeyframes();
  document.head.appendChild(style);
};

export const getAnimationConfig = (type: AnimationType, overrides?: Partial<AnimationConfig>): AnimationConfig => {
  const baseConfig = ANIMATION_DEFAULTS[type];
  return { ...baseConfig, ...overrides };
};
