import { forwardRef } from 'react';
import { Category } from '@/types/wrapped';

interface WrappedCardPreviewProps {
  category: Category;
  formData: Record<string, string | number>;
  imageUrl?: string | null;
}

const gradientStyles: Record<string, string> = {
  magenta: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  sunset: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
  aurora: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
  cosmic: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  golden: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
};

export const WrappedCardPreview = forwardRef<HTMLDivElement, WrappedCardPreviewProps>(
  ({ category, formData, imageUrl }, ref) => {
    const renderCardContent = () => {
      switch (category.id) {
        case 'person-called-most':
          return (
            <>
              <div className="text-center mb-6">
                <p className="text-lg opacity-80 font-medium mb-2">2025</p>
                <h3 className="text-2xl font-bold uppercase tracking-wider opacity-90">
                  Most Called
                </h3>
              </div>
              {imageUrl && (
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                  {formData.name || 'Their Name'}
                </h2>
                {formData.callCount && (
                  <div className="mt-4">
                    <p className="text-6xl font-extrabold">{formData.callCount}</p>
                    <p className="text-lg opacity-80 mt-1">calls this year</p>
                  </div>
                )}
              </div>
            </>
          );

        case 'mentor-of-year':
          return (
            <>
              <div className="text-center mb-6">
                <p className="text-lg opacity-80 font-medium mb-2">2025 Award</p>
                <h3 className="text-2xl font-bold uppercase tracking-wider opacity-90">
                  Mentor of the Year
                </h3>
              </div>
              {imageUrl && (
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                  {formData.name || 'Their Name'}
                </h2>
                {formData.lesson && (
                  <div className="bg-black/20 rounded-xl p-4 mt-auto">
                    <p className="text-lg italic opacity-90">"{formData.lesson}"</p>
                  </div>
                )}
              </div>
            </>
          );

        case 'friend-of-year':
          return (
            <>
              <div className="text-center mb-6">
                <p className="text-lg opacity-80 font-medium mb-2">2025 Award</p>
                <h3 className="text-2xl font-bold uppercase tracking-wider opacity-90">
                  Friend of the Year
                </h3>
              </div>
              {imageUrl && (
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                  {formData.name || 'Their Name'}
                </h2>
                {formData.memory && (
                  <div className="bg-black/20 rounded-xl p-4 mt-auto">
                    <p className="text-sm opacity-70 mb-1">Best Memory</p>
                    <p className="text-base opacity-90">{formData.memory}</p>
                  </div>
                )}
              </div>
            </>
          );

        case 'top-5-friends':
          return (
            <>
              <div className="text-center mb-8">
                <p className="text-lg opacity-80 font-medium mb-2">2025</p>
                <h3 className="text-3xl font-bold uppercase tracking-wider">
                  Top 5 Friends
                </h3>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-3">
                {[1, 2, 3, 4, 5].map((num) => {
                  const name = formData[`friend${num}`];
                  if (!name && num > 1) return null;
                  return (
                    <div
                      key={num}
                      className="flex items-center gap-4 bg-black/20 rounded-xl px-4 py-3"
                    >
                      <span className="text-2xl font-extrabold opacity-60">#{num}</span>
                      <span className="text-xl font-bold">{name || `Friend ${num}`}</span>
                    </div>
                  );
                })}
              </div>
            </>
          );

        case 'food-ate-most':
          return (
            <>
              <div className="text-center mb-6">
                <p className="text-lg opacity-80 font-medium mb-2">2025</p>
                <h3 className="text-2xl font-bold uppercase tracking-wider opacity-90">
                  Comfort Food
                </h3>
              </div>
              {imageUrl && (
                <div className="w-40 h-40 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl">
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                  {formData.food || 'Your Food'}
                </h2>
                {formData.times && (
                  <div className="mt-4">
                    <p className="text-5xl font-extrabold">{formData.times}x</p>
                    <p className="text-lg opacity-80 mt-1">times this year</p>
                  </div>
                )}
              </div>
            </>
          );

        case 'favorite-movie':
          return (
            <>
              <div className="text-center mb-6">
                <p className="text-lg opacity-80 font-medium mb-2">2025</p>
                <h3 className="text-2xl font-bold uppercase tracking-wider opacity-90">
                  Movie of the Year
                </h3>
              </div>
              {imageUrl && (
                <div className="w-32 h-48 mx-auto mb-6 rounded-xl overflow-hidden border-4 border-white/30 shadow-xl">
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                  {formData.title || 'Movie Title'}
                </h2>
                {formData.quote && (
                  <div className="bg-black/20 rounded-xl p-4 mt-auto">
                    <p className="text-lg italic opacity-90">"{formData.quote}"</p>
                  </div>
                )}
              </div>
            </>
          );

        case 'favorite-song':
          return (
            <>
              <div className="text-center mb-8">
                <p className="text-lg opacity-80 font-medium mb-2">2025</p>
                <h3 className="text-2xl font-bold uppercase tracking-wider opacity-90">
                  Song of the Year
                </h3>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-8xl mb-6">🎵</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center leading-tight">
                  {formData.song || 'Song Title'}
                </h2>
                {formData.artist && (
                  <p className="text-xl opacity-80 mb-6">{formData.artist}</p>
                )}
                {formData.plays && (
                  <div className="mt-4 bg-black/20 rounded-xl px-6 py-4">
                    <p className="text-4xl font-extrabold">{formData.plays}</p>
                    <p className="text-sm opacity-80">times played</p>
                  </div>
                )}
              </div>
            </>
          );

        case 'top-habits':
          return (
            <>
              <div className="text-center mb-8">
                <p className="text-lg opacity-80 font-medium mb-2">2025</p>
                <h3 className="text-3xl font-bold uppercase tracking-wider">
                  Top Habits
                </h3>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-3">
                {[1, 2, 3].map((num) => {
                  const habit = formData[`habit${num}`];
                  if (!habit && num > 1) return null;
                  return (
                    <div
                      key={num}
                      className="flex items-center gap-4 bg-black/20 rounded-xl px-4 py-4"
                    >
                      <span className="text-2xl">✓</span>
                      <span className="text-lg font-bold">{habit || `Habit ${num}`}</span>
                    </div>
                  );
                })}
              </div>
              {formData.streak && (
                <div className="text-center mt-6 bg-black/20 rounded-xl p-4">
                  <p className="text-3xl font-extrabold">{formData.streak} days</p>
                  <p className="text-sm opacity-80">longest streak</p>
                </div>
              )}
            </>
          );

        case 'highlights-2025':
          return (
            <>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold uppercase tracking-wider">
                  2025 Highlights
                </h3>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-4">
                {[1, 2, 3].map((num) => {
                  const highlight = formData[`highlight${num}`];
                  if (!highlight && num > 1) return null;
                  return (
                    <div
                      key={num}
                      className="bg-black/20 rounded-xl px-5 py-4"
                    >
                      <span className="text-lg font-bold">{highlight || `Highlight ${num}`}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-6xl text-center mt-6">✨</div>
            </>
          );

        case 'personal-award':
          return (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🏆</div>
                <p className="text-lg opacity-80 font-medium mb-2">2025 Personal Award</p>
              </div>
              {imageUrl && (
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight uppercase">
                  {formData.award || 'Award Title'}
                </h2>
                {formData.reason && (
                  <div className="bg-black/20 rounded-xl p-4 mt-auto">
                    <p className="text-base opacity-90">{formData.reason}</p>
                  </div>
                )}
              </div>
            </>
          );

        default:
          return (
            <div className="text-center flex-1 flex flex-col justify-center">
              <p className="text-2xl font-bold">{category.title}</p>
            </div>
          );
      }
    };

    return (
      <div
        ref={ref}
        className="wrapped-card w-[320px] sm:w-[360px] flex flex-col p-8 text-white font-display"
        style={{
          background: gradientStyles[category.gradient],
        }}
      >
        {renderCardContent()}
        
        {/* Watermark */}
        <div className="mt-auto pt-6 text-center">
          <p className="text-sm opacity-50 font-body font-medium tracking-wide">
            wrapped2025
          </p>
        </div>
      </div>
    );
  }
);

WrappedCardPreview.displayName = 'WrappedCardPreview';
