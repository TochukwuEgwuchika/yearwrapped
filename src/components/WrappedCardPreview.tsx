import { forwardRef } from 'react';
import { Subcategory } from '@/types/wrapped';
import { gradientStyles } from '@/lib/gradients';
import { YEAR, WATERMARK } from '@/lib/config';
import { cn } from '@/lib/utils';

interface WrappedCardPreviewProps {
  category: Subcategory;
  formData: Record<string, string | number>;
  imageUrl?: string | null;
  userName?: string;
}

export const WrappedCardPreview = forwardRef<
  HTMLDivElement,
  WrappedCardPreviewProps
>(({ category, formData, imageUrl, userName }, ref) => {
  
  // Generic card for normal categories
  const renderGenericCard = () => {
    const textFields = category.fields.filter(
      (f) => f.type === 'text' || f.type === 'textarea'
    );
    const numberFields = category.fields.filter((f) => f.type === 'number');
    const primaryField = textFields[0];
    const secondaryFields = textFields.slice(1);

    return (
      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 mb-1 truncate">
              {YEAR} WRAPPED
            </p>
            <h3 className="text-2xl font-black uppercase tracking-tight leading-none break-words">
              {category.title}
            </h3>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center glass-circle">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        {imageUrl && (
          <div className="relative w-full aspect-square mb-6 rounded-2xl border border-white/20 shadow-2xl group">
            {/* Preload image for iOS */}
            <img
              src={imageUrl}
              alt=""
              className="absolute w-px h-px opacity-0 pointer-events-none"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <div
              className="absolute inset-0 bg-cover bg-center duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </div>
        )}

        <div className="flex flex-col">
          {primaryField && (
            <h2
              className="text-4xl sm:text-5xl font-extrabold mb-4 leading-[0.9] tracking-tighter drop-shadow-lg break-words"
              style={{ overflowWrap: 'anywhere' }}
            >
              {(formData[primaryField.id] as string) ||
                primaryField.placeholder ||
                primaryField.label}
            </h2>
          )}

          {numberFields.length > 0 &&
            formData[numberFields[0].id] && (
              <div className="mt-4 glass-panel-strong rounded-2xl p-4 border border-white/10 inline-block">
                <p className="text-6xl font-black tracking-tighter break-words">
                  {formData[numberFields[0].id]}
                </p>
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest mt-1 break-words">
                  {numberFields[0].label}
                </p>
              </div>
            )}

          {secondaryFields.length > 0 &&
            formData[secondaryFields[0].id] && (
              <div className="mt-6">
                <div className="relative pl-6 border-l-2 border-white/30">
                  <p
                    className="text-lg font-medium italic leading-relaxed opacity-90 break-words"
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    "{formData[secondaryFields[0].id]}"
                  </p>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  };

  // List-style card for multi-text fields
  const renderListCard = () => {
    const listFields = category.fields.filter(
      (f) => f.type === 'text' && !f.id.includes('name')
    );

    return (
      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 mb-1 truncate">
              {YEAR} COLLECTION
            </p>
            <h3 className="text-3xl font-black uppercase tracking-tight break-words">
              {category.title}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center glass-circle">
            <span className="text-xl font-bold">#5</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 pr-1">
          {listFields.map((field, index) => {
            const value = formData[field.id];
            if (!value && index > 2) return null;

            return (
              <div
                key={field.id}
                className="group relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-white/5 skew-x-[-10deg] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <div className="flex items-baseline gap-4 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-3xl font-black opacity-30 italic flex-shrink-0">
                    0{index + 1}
                  </span>
                  <span
                    className="text-2xl font-bold min-w-0 break-words"
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    {(value as string) || '...'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const isListType =
    category.fields.filter((f) => f.type === 'text').length >= 4;

  return (
    <div
      ref={ref}
      className={cn(
        'wrapped-card w-full max-w-[380px] flex flex-col p-8 text-white font-display rounded-3xl',
        'border border-white/20 shadow-2xl relative'
      )}
      style={{ background: gradientStyles[category.gradient] }}
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay rounded-3xl" />

      {/* Glass sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none rounded-3xl" />

      {/* Content */}
      {isListType ? renderListCard() : renderGenericCard()}

      {/* Footer */}
      <div className="pt-6 flex justify-between items-end opacity-60">
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
        <p className="text-xs font-bold tracking-[0.2em] uppercase break-words text-right min-w-0">
          {userName && <span className="opacity-80">by {userName} • </span>}
          {WATERMARK}
        </p>
      </div>
    </div>
  );
});

WrappedCardPreview.displayName = 'WrappedCardPreview';
