// src/lib/utils.ts
/**
 * Utility function to conditionally join class names.
 * Accepts strings, arrays, objects (with boolean values), or any combination.
 * 
 * @example 
 * cn('class1', { class2: true, class3: false }, ['class4', null])
 * // returns 'class1 class2 class4'
 */
export function cn(...args: (string | number | boolean | null | undefined | Record<string, unknown> | (string | null | undefined)[])[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    switch (typeof arg) {
      case 'string':
      case 'number':
        classes.push(String(arg));
        break;
      
      case 'object':
        if (Array.isArray(arg)) {
          const inner = cn(...arg);
          if (inner) {
            classes.push(inner);
          }
        } else {
          for (const [key, value] of Object.entries(arg)) {
            if (value) {
              classes.push(key);
            }
          }
        }
        break;
    }
  }

  return classes.join(' ');
}