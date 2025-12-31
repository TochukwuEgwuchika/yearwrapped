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

export const WrappedCardPreview = forwardRef<HTMLDivElement, WrappedCardPreviewProps>(
  ({ category, formData, imageUrl, userName }, ref) => {
    // Generic card renderer that works for any category
    const renderGenericCard = () => {
      const textFields = category.fields.filter((f) => f.type === 'text' || f.type === 'textarea');
      const numberFields = category.fields.filter((f) => f.type === 'number');
      const primaryField = textFields[0];
      const secondaryFields = textFields.slice(1);

      return (
        <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
          <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
            <div>
                 <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 mb-1">{YEAR} WRAPPED</p>
                 <h3 className="text-2xl font-black uppercase tracking-tight leading-none">{category.title}</h3>
            </div>
             <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center glass-circle">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
             </div>
          </div>

          {imageUrl && (
            <div 
              className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden border border-white/20 shadow-2xl group"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <div 
                    className="absolute inset-0 bg-cover bg-center duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
            </div>
          )}

          <div className="flex-1 flex flex-col justify-center relative">
            {primaryField && (
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-[0.9] tracking-tighter drop-shadow-lg">
                {(formData[primaryField.id] as string) || primaryField.placeholder || primaryField.label}
              </h2>
            )}

            {numberFields.length > 0 && formData[numberFields[0].id] && (
              <div className="mt-4 glass-panel-strong rounded-2xl p-4 border border-white/10 inline-block">
                <p className="text-6xl font-black tracking-tighter">{formData[numberFields[0].id]}</p>
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest mt-1">{numberFields[0].label}</p>
              </div>
            )}

            {secondaryFields.length > 0 && formData[secondaryFields[0].id] && (
              <div className="mt-auto pt-6">
                <div className="relative pl-6 border-l-2 border-white/30">
                     <p className="text-lg font-medium italic leading-relaxed opacity-90">"{formData[secondaryFields[0].id]}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    // List-style card for categories with multiple similar fields
    const renderListCard = () => {
      const listFields = category.fields.filter((f) => f.type === 'text' && !f.id.includes('name'));
      
      return (
        <div className="relative z-10 flex flex-col h-full">
           <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
             <div>
                 <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 mb-1">{YEAR} COLLECTION</p>
                 <h3 className="text-3xl font-black uppercase tracking-tight">{category.title}</h3>
            </div>
             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center glass-circle">
                 <span className="text-xl font-bold">#5</span>
             </div>
          </div>

          <div className="flex-1 flex flex-col justify-start space-y-4">
            {listFields.map((field, index) => {
              const value = formData[field.id];
              // Show placeholder for first items if empty to show structure
              if (!value && index > 2) return null; 
              
              return (
                <div key={field.id} className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 skew-x-[-10deg] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <div className="flex alignItems-baseline gap-4 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-3xl font-black opacity-30 italic">0{index + 1}</span>
                        <span className="text-2xl font-bold w-full truncate">{(value as string) || "..."}</span>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    // Determine card type based on fields
    const isListType = category.fields.filter((f) => f.type === 'text').length >= 4;

    return (
      <div
        ref={ref}
        className={cn(
            "wrapped-card w-full max-w-[320px] sm:max-w-[380px] flex flex-col p-8 text-white font-display overflow-hidden",
            "border border-white/20 shadow-2xl relative"
        )}
        style={{ background: gradientStyles[category.gradient] }}
      >
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
        
        {/* Glass sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
        
        {/* Content */}
        {isListType ? renderListCard() : renderGenericCard()}

        <div className="mt-auto pt-6 flex justify-between items-end opacity-60">
           <div className="flex gap-1">
               <div className="w-1 h-1 bg-white rounded-full" />
               <div className="w-1 h-1 bg-white rounded-full" />
               <div className="w-1 h-1 bg-white rounded-full" />
           </div>
           <p className="text-xs font-bold tracking-[0.2em] uppercase">
             {userName && <span className="opacity-80">by {userName} • </span>}
             {WATERMARK}
           </p>
        </div>
      </div>
    );
  }
);

WrappedCardPreview.displayName = 'WrappedCardPreview';
