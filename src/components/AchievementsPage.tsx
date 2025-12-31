import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Target, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ACHIEVEMENTS, TOTAL_POSSIBLE_POINTS } from '@/lib/achievementsData';
import {
  getAllAchievementProgress,
  getCompletionStats,
  getRarityClass,
  getRarityBgClass,
} from '@/lib/achievements';
import { gradientClasses } from '@/lib/gradients';
import { AchievementCategory } from '@/types/achievements';

interface AchievementsPageProps {
  onBack: () => void;
}

const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  milestone: 'Milestones',
  category: 'Category Masters',
  combo: 'Combos',
  special: 'Hidden',
};

export const AchievementsPage = ({ onBack }: AchievementsPageProps) => {
  const { getSavedWrappeds, getAchievementState } = useApp();
  const [activeCategory, setActiveCategory] = useState<
    AchievementCategory | 'all'
  >('all');

  const savedWrappeds = getSavedWrappeds();
  const achievementState = getAchievementState();
  const allProgress = getAllAchievementProgress(savedWrappeds, achievementState);
  const stats = getCompletionStats(savedWrappeds);

  const filteredProgress =
    activeCategory === 'all'
      ? allProgress.filter((p) => !p.achievement.hidden || p.isUnlocked)
      : allProgress.filter(
          (p) =>
            p.achievement.category === activeCategory &&
            (!p.achievement.hidden || p.isUnlocked)
        );

  const unlockedCount = allProgress.filter((p) => p.isUnlocked).length;
  const visibleTotal = ACHIEVEMENTS.filter((a) => !a.hidden).length;

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

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-golden flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Achievements
              </h2>
              <p className="text-muted-foreground">
                {unlockedCount}/{visibleTotal} unlocked
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="text-2xl font-bold text-foreground">
                {stats.completedCards}
              </p>
              <p className="text-xs text-muted-foreground">Cards Created</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="text-2xl font-bold text-foreground">
                {achievementState.totalPoints}
              </p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="text-2xl font-bold text-foreground">
                {stats.percentage}%
              </p>
              <p className="text-xs text-muted-foreground">Completion</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Overall Progress</span>
              <span>
                {achievementState.totalPoints}/{TOTAL_POSSIBLE_POINTS} pts
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(achievementState.totalPoints / TOTAL_POSSIBLE_POINTS) * 100}%`,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full gradient-golden"
              />
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
            className={activeCategory === 'all' ? 'gradient-magenta border-0' : ''}
          >
            All
          </Button>
          {(Object.keys(CATEGORY_LABELS) as AchievementCategory[]).map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={
                activeCategory === cat ? 'gradient-magenta border-0' : ''
              }
            >
              {CATEGORY_LABELS[cat]}
            </Button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProgress.map((item, index) => (
              <motion.div
                key={item.achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  relative overflow-hidden rounded-2xl p-5 border
                  ${
                    item.isUnlocked
                      ? `bg-card ${getRarityClass(item.achievement.rarity)}`
                      : 'bg-secondary/30 border-border opacity-60'
                  }
                `}
              >
                {/* Gradient accent for unlocked */}
                {item.isUnlocked && (
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${gradientClasses[item.achievement.gradient]}`}
                  />
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`
                    w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0
                    ${
                      item.isUnlocked
                        ? gradientClasses[item.achievement.gradient]
                        : 'bg-secondary'
                    }
                  `}
                  >
                    {item.isUnlocked ? (
                      item.achievement.icon
                    ) : (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-display font-bold text-foreground">
                        {item.achievement.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wider ${getRarityBgClass(item.achievement.rarity)} ${getRarityClass(item.achievement.rarity)}`}
                      >
                        {item.achievement.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.achievement.description}
                    </p>

                    {/* Progress bar */}
                    {!item.isUnlocked && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{item.progressText}</span>
                          <span>{Math.round(item.progress)}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            className={`h-full ${gradientClasses[item.achievement.gradient]}`}
                          />
                        </div>
                      </div>
                    )}

                    {item.isUnlocked && item.unlockedAt && (
                      <p className="text-xs text-muted-foreground">
                        Unlocked{' '}
                        {new Date(item.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold text-foreground">
                      +{item.achievement.points}
                    </span>
                    <p className="text-xs text-muted-foreground">pts</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProgress.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
              <Target className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              No achievements in this category
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different filter
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
