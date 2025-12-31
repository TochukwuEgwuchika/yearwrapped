import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

interface SavedButtonProps {
  onClick: () => void;
}

export const SavedButton = ({ onClick }: SavedButtonProps) => {
  const { getSavedWrappeds, view } = useApp();
  const savedCount = getSavedWrappeds().length;

  // Don't show on saved view or if no saved items
  if (view === 'saved' || savedCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50"
      >
        <Button
          onClick={onClick}
          size="lg"
          className="rounded-full px-6 py-6 h-auto gradient-magenta text-white font-bold text-base shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all gap-3 animate-pulse-slow"
        >
          <FolderOpen className="w-6 h-6" />
          <span>My Wrappeds</span>
          <span className="bg-white text-primary font-bold rounded-full h-7 min-w-7 px-2 flex items-center justify-center text-sm">
            {savedCount}
          </span>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
