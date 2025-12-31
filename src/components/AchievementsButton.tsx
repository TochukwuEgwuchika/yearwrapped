import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ACHIEVEMENTS } from '@/lib/achievementsData';

interface AchievementsButtonProps {
  onClick: () => void;
}

export const AchievementsButton = ({ onClick }: AchievementsButtonProps) => {
  const { getAchievementState, view } = useApp();
  const state = getAchievementState();
  const unlockedCount = state.unlocked.length;
  const totalCount = ACHIEVEMENTS.filter((a) => !a.hidden).length;

  // Don't show on achievements view
  if (view === 'achievements') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-50"
      >
        <Button
          onClick={onClick}
          size="lg"
          className="rounded-full px-6 py-6 h-auto gradient-golden text-white font-bold text-base shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all gap-3"
        >
          <Trophy className="w-6 h-6" />
          <span className="hidden sm:inline">Achievements</span>
          <span className="bg-white text-amber-600 font-bold rounded-full h-7 min-w-7 px-2 flex items-center justify-center text-sm">
            {unlockedCount}/{totalCount}
          </span>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
