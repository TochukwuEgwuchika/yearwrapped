import { AnimatePresence, motion } from 'framer-motion';
import { LandingHero } from '@/components/LandingHero';
import { FeaturesStack } from '@/components/FeaturesStack';
import { CategoryBrowser } from '@/components/CategoryBrowser';
import { CardEditor } from '@/components/CardEditor';
import { CustomCategoryCreator } from '@/components/CustomCategoryCreator';
import { QuickWrappedSelector } from '@/components/QuickWrappedSelector';
import { SavedWrappeds } from '@/components/SavedWrappeds';
import { AchievementsPage } from '@/components/AchievementsPage';
import { Subcategory } from '@/types/wrapped';
import { useApp } from '@/context/AppContext';

const Index = () => {
  const { 
    view, 
    setAppState, 
    selectedCategory, 
    setSelectedCategory, 
    quickWrappedQueue, 
    setQuickWrappedQueue 
  } = useApp();

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

  const handleViewSaved = () => setAppState('saved');

  const handleViewAchievements = () => setAppState('achievements');

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
        {view === 'landing' && (
          <motion.div 
            key="landing" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
            className="overflow-x-hidden"
          >
            <LandingHero onGetStarted={handleGetStarted} />
            <FeaturesStack />
          </motion.div>
        )}

        {view === 'categories' && (
          <motion.div key="categories" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <CategoryBrowser
              onSelectSubcategory={handleSelectCategory}
              onBack={handleBackToLanding}
              onCreateCustom={handleCreateCustom}
              onQuickWrapped={handleQuickWrapped}
              onViewSaved={handleViewSaved}
              onViewAchievements={handleViewAchievements}
            />
          </motion.div>
        )}

        {view === 'saved' && (
          <motion.div key="saved" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <SavedWrappeds onBack={handleBackToCategories} />
          </motion.div>
        )}

        {view === 'achievements' && (
          <motion.div key="achievements" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <AchievementsPage onBack={handleBackToCategories} />
          </motion.div>
        )}

        {view === 'custom' && (
          <motion.div key="custom" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <CustomCategoryCreator onBack={handleBackToCategories} onSave={handleCustomSave} />
          </motion.div>
        )}

        {view === 'quick-wrapped' && (
          <motion.div key="quick" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <QuickWrappedSelector onBack={handleBackToCategories} onStart={handleQuickWrappedStart} />
          </motion.div>
        )}

        {view === 'editor' && selectedCategory && (
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
