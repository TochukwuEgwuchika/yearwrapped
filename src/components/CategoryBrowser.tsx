import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronRight, Plus, Shuffle, Sparkles, List, LayoutGrid, Trophy, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MAIN_CATEGORIES, Subcategory, RANDOM_PROMPTS } from '@/types/wrapped';
import { gradientClasses } from '@/lib/gradients';
import { useApp } from '@/context/AppContext';

interface CategoryBrowserProps {
  onSelectSubcategory: (subcategory: Subcategory) => void;
  onBack: () => void;
  onCreateCustom: () => void;
  onQuickWrapped: () => void;
  onViewSaved?: () => void;
  onViewAchievements?: () => void;
}

export const CategoryBrowser = ({
  onSelectSubcategory,
  onBack,
  onCreateCustom,
  onQuickWrapped,
  onViewSaved,
  onViewAchievements
}: CategoryBrowserProps) => {
  const { getSavedWrappeds, getAchievementState } = useApp();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['people']));
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const savedCount = getSavedWrappeds().length;
  const achievementState = getAchievementState();
  const unlockedCount = achievementState.unlocked.length;

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const handleRandomPick = () => {
    // Pick a random subcategory
    const allSubcategories = MAIN_CATEGORIES.flatMap((cat) => cat.subcategories);
    const randomIndex = Math.floor(Math.random() * allSubcategories.length);
    onSelectSubcategory(allSubcategories[randomIndex]);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
            Choose Your <span className="text-gradient-magenta">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Explore categories or create your own personalized awards
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Button
              onClick={onQuickWrapped}
              className="gradient-magenta border-0 gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Quick Wrapped
            </Button>
            <Button
              onClick={handleRandomPick}
              variant="outline"
              className="gap-2 border-border"
            >
              <Shuffle className="w-4 h-4" />
              Surprise Me
            </Button>
            <Button
              onClick={onCreateCustom}
              variant="outline"
              className="gap-2 border-border"
            >
              <Plus className="w-4 h-4" />
              Create Custom
            </Button>
            {/* View Toggle & Menu */}
            <div className="flex items-center gap-2 ml-auto">
              {/* View Toggle */}
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-border" />

              {/* My Wrappeds */}
              {onViewSaved && (
                <Button
                  onClick={onViewSaved}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 relative"
                  title="My Wrappeds"
                >
                  <FolderOpen className="w-4 h-4" />
                  {savedCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                      {savedCount > 99 ? '99+' : savedCount}
                    </span>
                  )}
                </Button>
              )}

              {/* Achievements */}
              {onViewAchievements && (
                <Button
                  onClick={onViewAchievements}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 relative"
                  title="Achievements"
                >
                  <Trophy className="w-4 h-4" />
                  {unlockedCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unlockedCount}
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Categories View */}
        <AnimatePresence mode="wait">
          {/* List View (Accordion) */}
          {viewMode === 'list' && (
            <motion.div
              key="list-view"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {MAIN_CATEGORIES.map((mainCategory) => (
                <motion.div
                  key={mainCategory.id}
                  variants={item}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  {/* Main Category Header */}
                  <button
                    onClick={() => toggleCategory(mainCategory.id)}
                    className={`w-full flex items-center justify-between p-5 transition-all duration-300 hover:bg-secondary/50`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-12 h-12 rounded-xl ${gradientClasses[mainCategory.gradient]} flex items-center justify-center text-2xl`}
                      >
                        {mainCategory.icon}
                      </span>
                      <div className="text-left">
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {mainCategory.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {mainCategory.subcategories.length} categories
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCategories.has(mainCategory.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  {/* Subcategories */}
                  <AnimatePresence>
                    {expandedCategories.has(mainCategory.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {mainCategory.subcategories.map((subcategory) => (
                            <motion.button
                              key={subcategory.id}
                              onClick={() => onSelectSubcategory(subcategory)}
                              onMouseEnter={() => setHoveredSubcategory(subcategory.id)}
                              onMouseLeave={() => setHoveredSubcategory(null)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="relative group flex items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-all duration-200 text-left border border-transparent hover:border-border"
                            >
                              <span className="text-2xl">{subcategory.icon}</span>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground truncate">
                                  {subcategory.title}
                                </h4>
                                <p className="text-sm text-muted-foreground truncate">
                                  {subcategory.description}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />

                              {/* Gradient indicator */}
                              <div
                                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${gradientClasses[subcategory.gradient]} opacity-0 group-hover:opacity-100 transition-opacity`}
                              />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Grid View (Grouped) */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {MAIN_CATEGORIES.map((mainCategory) => (
                <div key={mainCategory.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`w-8 h-8 rounded-lg ${gradientClasses[mainCategory.gradient]} flex items-center justify-center text-lg`}
                    >
                      {mainCategory.icon}
                    </span>
                    <h3 className="font-display font-bold text-foreground">
                      {mainCategory.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {mainCategory.subcategories.length}
                    </span>
                  </div>

                  {/* Subcategory Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {mainCategory.subcategories.map((subcategory) => (
                      <motion.button
                        key={subcategory.id}
                        onClick={() => onSelectSubcategory(subcategory)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative flex items-center gap-2 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-transparent hover:border-border transition-all text-left"
                      >
                        <span className="text-xl">{subcategory.icon}</span>
                        <span className="font-medium text-sm truncate">{subcategory.title}</span>
                        {/* Gradient indicator */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${gradientClasses[subcategory.gradient]} opacity-0 group-hover:opacity-100 transition-opacity`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Random Prompts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="font-display text-xl font-bold mb-4 text-foreground">
            Need inspiration? Try these prompts:
          </h3>
          <div className="flex flex-wrap gap-2">
            {RANDOM_PROMPTS.slice(0, 8).map((prompt, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary/50 rounded-full text-sm text-muted-foreground border border-border"
              >
                {prompt}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
