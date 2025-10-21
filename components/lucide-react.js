
import React from 'react';

const createLucideIcon = (iconName, iconNode) => {
  const Component = React.forwardRef(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, absoluteStrokeWidth, className = '', children, ...rest }, ref) => {
      return React.createElement(
        'svg',
        {
          ref,
          ...rest,
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          className: `lucide lucide-${iconName} ${className}`,
        },
        [...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)), ...(children ? [children] : [])]
      );
    }
  );
  Component.displayName = `${iconName}`;
  return Component;
};

export const RefreshCw = createLucideIcon('refresh-cw', [
  ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' }],
  ['path', { d: 'M21 3v5h-5' }],
  ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' }],
  ['path', { d: 'M3 21v-5h5' }],
]);

export const Users = createLucideIcon('users', [
  ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1vj4v3' }],
  ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
  ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
  ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75', key: '1da9ce' }],
]);

export const Mail = createLucideIcon('mail', [
  ['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
  ['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
]);

export const Loader2 = createLucideIcon('loader-2', [
  ['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }],
]);

export const AlertTriangle = createLucideIcon('alert-triangle', [
    ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' }],
    ['path', { d: 'M12 9v4' }],
    ['path', { d: 'M12 17h.01' }],
]);
