import { forwardRef } from 'react';
import { Subcategory, GradientType } from '@/types/wrapped';

interface WrappedCardPreviewProps {
  category: Subcategory;
  formData: Record<string, string | number>;
  imageUrl?: string | null;
}

const gradientStyles: Record<GradientType, string> = {
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

export const WrappedCardPreview = forwardRef<HTMLDivElement, WrappedCardPreviewProps>(
  ({ category, formData, imageUrl }, ref) => {
    // Generic card renderer that works for any category
    const renderGenericCard = () => {
      const textFields = category.fields.filter((f) => f.type === 'text' || f.type === 'textarea');
      const numberFields = category.fields.filter((f) => f.type === 'number');
      const primaryField = textFields[0];
      const secondaryFields = textFields.slice(1);

      return (
        <>
          <div className="text-center mb-6">
            <p className="text-lg opacity-80 font-medium mb-2">2026</p>
            <h3 className="text-2xl font-bold uppercase tracking-wider opacity-90">{category.title}</h3>
          </div>

          {imageUrl && (
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
              <img 
                src={imageUrl} 
                alt="" 
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                style={{ imageRendering: 'auto' }}
              />
            </div>
          )}

          <div className="text-center flex-1 flex flex-col justify-center">
            {primaryField && (
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                {(formData[primaryField.id] as string) || primaryField.placeholder || primaryField.label}
              </h2>
            )}

            {numberFields.length > 0 && formData[numberFields[0].id] && (
              <div className="mt-4">
                <p className="text-5xl font-extrabold">{formData[numberFields[0].id]}</p>
                <p className="text-lg opacity-80 mt-1">{numberFields[0].label.toLowerCase()}</p>
              </div>
            )}

            {secondaryFields.length > 0 && formData[secondaryFields[0].id] && (
              <div className="bg-black/20 rounded-xl p-4 mt-auto">
                <p className="text-base opacity-90">"{formData[secondaryFields[0].id]}"</p>
              </div>
            )}
          </div>
        </>
      );
    };

    // List-style card for categories with multiple similar fields
    const renderListCard = () => {
      const listFields = category.fields.filter((f) => f.type === 'text' && !f.id.includes('name'));
      const hasValidItems = listFields.some((f) => formData[f.id]);

      return (
        <>
          <div className="text-center mb-8">
            <p className="text-lg opacity-80 font-medium mb-2">2026</p>
            <h3 className="text-3xl font-bold uppercase tracking-wider">{category.title}</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-3">
            {listFields.map((field, index) => {
              const value = formData[field.id];
              if (!value && index > 0) return null;
              return (
                <div key={field.id} className="flex items-center gap-4 bg-black/20 rounded-xl px-4 py-3">
                  <span className="text-2xl font-extrabold opacity-60">#{index + 1}</span>
                  <span className="text-xl font-bold">{(value as string) || field.placeholder}</span>
                </div>
              );
            })}
          </div>
        </>
      );
    };

    // Determine card type based on fields
    const isListType = category.fields.filter((f) => f.type === 'text').length >= 4;

    return (
      <div
        ref={ref}
        className="wrapped-card w-[320px] sm:w-[360px] flex flex-col p-8 text-white font-display"
        style={{ background: gradientStyles[category.gradient] }}
      >
        {isListType ? renderListCard() : renderGenericCard()}
        <div className="mt-auto pt-6 text-center">
          <p className="text-sm opacity-50 font-body font-medium tracking-wide">wrapped2026</p>
        </div>
      </div>
    );
  }
);

WrappedCardPreview.displayName = 'WrappedCardPreview';
