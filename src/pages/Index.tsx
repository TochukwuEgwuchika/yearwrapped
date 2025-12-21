import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingHero } from '@/components/LandingHero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { CardEditor } from '@/components/CardEditor';
import { Category } from '@/types/wrapped';

type AppState = 'landing' | 'categories' | 'editor';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleGetStarted = () => {
    setAppState('categories');
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setAppState('editor');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setAppState('categories');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingHero onGetStarted={handleGetStarted} />
          </motion.div>
        )}

        {appState === 'categories' && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryGrid
              onSelectCategory={handleSelectCategory}
              onBack={handleBackToLanding}
            />
          </motion.div>
        )}

        {appState === 'editor' && selectedCategory && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CardEditor
              category={selectedCategory}
              onBack={handleBackToCategories}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
