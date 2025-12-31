import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Shuffle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MAIN_CATEGORIES, Subcategory, GradientType } from '@/types/wrapped';

interface QuickWrappedSelectorProps {
  onBack: () => void;
  onStart: (selectedCategories: Subcategory[]) => void;
}

const gradientClasses: Record<GradientType, string> = {
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

// Popular categories for quick selection
const POPULAR_SUBCATEGORY_IDS = [
  'friend-of-year',
  'favorite-song',
  'favorite-movie',
  'food-ate-most',
  'highlights-2025',
  'top-5-friends',
  'best-purchase',
  'personal-award',
];

export const QuickWrappedSelector = ({ onBack, onStart }: QuickWrappedSelectorProps) => {
  const allSubcategories = MAIN_CATEGORIES.flatMap((cat) => cat.subcategories);
  const popularSubcategories = allSubcategories.filter((sub) =>
    POPULAR_SUBCATEGORY_IDS.includes(sub.id)
  );

  const [selected, setSelected] = useState<Set<string>>(
    new Set(POPULAR_SUBCATEGORY_IDS.slice(0, 5))
  );

  const toggleSelection = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 10) {
          return prev; // Max 10 selections
        }
        next.add(id);
      }
      return next;
    });
  };

  const selectRandom = () => {
    const shuffled = [...allSubcategories].sort(() => Math.random() - 0.5);
    const randomSelection = shuffled.slice(0, 5).map((s) => s.id);
    setSelected(new Set(randomSelection));
  };

  const handleStart = () => {
    const selectedSubcategories = allSubcategories.filter((sub) =>
      selected.has(sub.id)
    );
    onStart(selectedSubcategories);
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Quick <span className="text-gradient-magenta">Wrapped</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Select up to 10 categories to create your personalized wrapped collection
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              onClick={selectRandom}
              variant="outline"
              className="gap-2 border-border"
            >
              <Shuffle className="w-4 h-4" />
              Randomize Selection
            </Button>
            <span className="flex items-center text-muted-foreground">
              {selected.size} / 10 selected
            </span>
          </div>
        </motion.div>

        {/* Popular Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="font-display text-xl font-semibold mb-4 text-foreground">
            Popular Choices
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularSubcategories.map((subcategory) => (
              <motion.button
                key={subcategory.id}
                onClick={() => toggleSelection(subcategory.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                  selected.has(subcategory.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{subcategory.icon}</span>
                  {selected.has(subcategory.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </div>
                <h4 className="font-semibold text-foreground text-sm">
                  {subcategory.title}
                </h4>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* All Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-display text-xl font-semibold mb-4 text-foreground">
            All Categories
          </h3>
          <div className="space-y-6">
            {MAIN_CATEGORIES.map((mainCat) => (
              <div key={mainCat.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`w-8 h-8 rounded-lg ${gradientClasses[mainCat.gradient]} flex items-center justify-center text-lg`}
                  >
                    {mainCat.icon}
                  </span>
                  <h4 className="font-semibold text-foreground">{mainCat.title}</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {mainCat.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => toggleSelection(subcategory.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg text-left transition-all duration-200 text-sm ${
                        selected.has(subcategory.id)
                          ? 'bg-primary/20 text-foreground'
                          : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                      }`}
                    >
                      <span>{subcategory.icon}</span>
                      <span className="truncate">{subcategory.title}</span>
                      {selected.has(subcategory.id) && (
                        <Check className="w-3 h-3 ml-auto shrink-0 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="sticky bottom-8 mt-12"
        >
          <Button
            onClick={handleStart}
            disabled={selected.size === 0}
            className="w-full py-6 text-lg rounded-2xl gradient-magenta border-0 gap-2 shadow-lg"
          >
            Start Creating ({selected.size} cards)
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
