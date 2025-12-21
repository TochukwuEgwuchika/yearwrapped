import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingHero } from '@/components/LandingHero';
import { CategoryBrowser } from '@/components/CategoryBrowser';
import { CardEditor } from '@/components/CardEditor';
import { CustomCategoryCreator } from '@/components/CustomCategoryCreator';
import { QuickWrappedSelector } from '@/components/QuickWrappedSelector';
import { Subcategory } from '@/types/wrapped';

type AppState = 'landing' | 'categories' | 'editor' | 'custom' | 'quick-wrapped';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedCategory, setSelectedCategory] = useState<Subcategory | null>(null);
  const [quickWrappedQueue, setQuickWrappedQueue] = useState<Subcategory[]>([]);

  const handleGetStarted = () => setAppState('categories');

  const handleSelectCategory = (category: Subcategory) => {
    setSelectedCategory(category);
    setAppState('editor');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setQuickWrappedQueue([]);
    setAppState('categories');
  };

  const handleBackToLanding = () => setAppState('landing');

  const handleCreateCustom = () => setAppState('custom');

  const handleQuickWrapped = () => setAppState('quick-wrapped');

  const handleCustomSave = (category: Subcategory) => {
    setSelectedCategory(category);
    setAppState('editor');
  };

  const handleQuickWrappedStart = (categories: Subcategory[]) => {
    if (categories.length > 0) {
      setQuickWrappedQueue(categories.slice(1));
      setSelectedCategory(categories[0]);
      setAppState('editor');
    }
  };

  const handleNextInQueue = () => {
    if (quickWrappedQueue.length > 0) {
      setSelectedCategory(quickWrappedQueue[0]);
      setQuickWrappedQueue(quickWrappedQueue.slice(1));
    } else {
      handleBackToCategories();
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LandingHero onGetStarted={handleGetStarted} />
          </motion.div>
        )}

        {appState === 'categories' && (
          <motion.div key="categories" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <CategoryBrowser
              onSelectSubcategory={handleSelectCategory}
              onBack={handleBackToLanding}
              onCreateCustom={handleCreateCustom}
              onQuickWrapped={handleQuickWrapped}
            />
          </motion.div>
        )}

        {appState === 'custom' && (
          <motion.div key="custom" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <CustomCategoryCreator onBack={handleBackToCategories} onSave={handleCustomSave} />
          </motion.div>
        )}

        {appState === 'quick-wrapped' && (
          <motion.div key="quick" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <QuickWrappedSelector onBack={handleBackToCategories} onStart={handleQuickWrappedStart} />
          </motion.div>
        )}

        {appState === 'editor' && selectedCategory && (
          <motion.div key="editor" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <CardEditor
              category={selectedCategory}
              onBack={handleBackToCategories}
              onNext={quickWrappedQueue.length > 0 ? handleNextInQueue : undefined}
              remainingCount={quickWrappedQueue.length}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
