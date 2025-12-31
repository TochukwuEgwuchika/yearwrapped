import { GradientType } from '@/types/wrapped';

/**
 * Tailwind gradient class mappings for use in components
 */
export const gradientClasses: Record<GradientType, string> = {
  magenta: 'gradient-magenta',
  sunset: 'gradient-sunset',
  aurora: 'gradient-aurora',
  cosmic: 'gradient-cosmic',
  golden: 'gradient-golden',
  ocean: 'gradient-ocean',
  forest: 'gradient-forest',
  berry: 'gradient-berry',
  fire: 'gradient-fire',
  midnight: 'gradient-midnight',
};

/**
 * Inline gradient styles for canvas/image export (hex values for html-to-image)
 */
export const gradientStyles: Record<GradientType, string> = {
  magenta: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  sunset: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
  aurora: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
  cosmic: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  golden: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
  ocean: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  forest: 'linear-gradient(135deg, #059669 0%, #16a34a 100%)',
  berry: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
  fire: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
  midnight: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
};
