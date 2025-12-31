import { motion } from 'framer-motion';
import { Achievement } from '@/types/achievements';
import { gradientClasses } from '@/lib/gradients';
import { getRarityClass } from '@/lib/achievements';

interface AchievementToastProps {
  achievement: Achievement;
  onDismiss: () => void;
}

export const AchievementToast = ({
  achievement,
  onDismiss,
}: AchievementToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      onClick={onDismiss}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] cursor-pointer"
    >
      <div
        className={`
        relative overflow-hidden rounded-2xl p-4 pr-6
        bg-card border-2 ${getRarityClass(achievement.rarity)}
        shadow-2xl min-w-[300px] max-w-[400px]
      `}
      >
        {/* Gradient accent */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-2 ${gradientClasses[achievement.gradient]}`}
        />

        <div className="flex items-center gap-4 pl-4">
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className={`w-14 h-14 rounded-xl ${gradientClasses[achievement.gradient]} flex items-center justify-center text-3xl`}
          >
            {achievement.icon}
          </motion.div>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Achievement Unlocked!
            </p>
            <h4 className="font-display font-bold text-lg text-foreground">
              {achievement.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              +{achievement.points} points
            </p>
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        />
      </div>
    </motion.div>
  );
};
