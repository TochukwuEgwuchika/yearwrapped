import { ACHIEVEMENTS, getAchievementById } from '@/lib/achievementsData';
import { MAIN_CATEGORIES } from '@/types/wrapped';
import {
  Achievement,
  AchievementProgress,
  AchievementState,
  UnlockedAchievement,
  AchievementRarity,
} from '@/types/achievements';

export interface SavedWrappedMinimal {
  categoryId: string;
}

/**
 * Check if a specific achievement criteria is met
 */
export function checkAchievementCriteria(
  achievement: Achievement,
  savedWrappeds: SavedWrappedMinimal[],
  _achievementState: AchievementState
): { met: boolean; progress: number; progressText: string } {
  const criteria = achievement.criteria;

  switch (criteria.type) {
    case 'card_count': {
      const uniqueCategories = new Set(savedWrappeds.map((w) => w.categoryId));
      const count = uniqueCategories.size;
      const progress = Math.min((count / criteria.count) * 100, 100);
      return {
        met: count >= criteria.count,
        progress,
        progressText: `${count}/${criteria.count} cards`,
      };
    }

    case 'category_complete': {
      const mainCategory = MAIN_CATEGORIES.find(
        (c) => c.id === criteria.mainCategoryId
      );
      if (!mainCategory) return { met: false, progress: 0, progressText: '0/0' };

      const subcategoryIds = new Set(mainCategory.subcategories.map((s) => s.id));
      const completedIds = new Set(savedWrappeds.map((w) => w.categoryId));
      const completed = [...subcategoryIds].filter((id) =>
        completedIds.has(id)
      ).length;
      const total = subcategoryIds.size;

      return {
        met: completed >= total,
        progress: (completed / total) * 100,
        progressText: `${completed}/${total} ${mainCategory.title}`,
      };
    }

    case 'subcategories_complete': {
      const requiredIds = new Set(criteria.subcategoryIds);
      const completedIds = new Set(savedWrappeds.map((w) => w.categoryId));
      const completed = [...requiredIds].filter((id) =>
        completedIds.has(id)
      ).length;
      const total = requiredIds.size;

      return {
        met: completed >= total,
        progress: (completed / total) * 100,
        progressText: `${completed}/${total} complete`,
      };
    }

    case 'all_categories_complete': {
      const allSubcategoryIds = MAIN_CATEGORIES.flatMap((c) =>
        c.subcategories.map((s) => s.id)
      );
      const completedIds = new Set(savedWrappeds.map((w) => w.categoryId));
      const completed = allSubcategoryIds.filter((id) =>
        completedIds.has(id)
      ).length;
      const total = allSubcategoryIds.length;

      return {
        met: completed >= total,
        progress: (completed / total) * 100,
        progressText: `${completed}/${total} total`,
      };
    }

    case 'custom':
      // Custom achievements handled separately
      return { met: false, progress: 0, progressText: 'Special' };

    default:
      return { met: false, progress: 0, progressText: '' };
  }
}

/**
 * Get all achievement progress for display
 */
export function getAllAchievementProgress(
  savedWrappeds: SavedWrappedMinimal[],
  achievementState: AchievementState
): AchievementProgress[] {
  return ACHIEVEMENTS.map((achievement) => {
    const unlocked = achievementState.unlocked.find(
      (u) => u.achievementId === achievement.id
    );
    const { met, progress, progressText } = checkAchievementCriteria(
      achievement,
      savedWrappeds,
      achievementState
    );

    return {
      achievement,
      isUnlocked: !!unlocked || met,
      unlockedAt: unlocked?.unlockedAt,
      progress,
      progressText,
    };
  });
}

/**
 * Check and return newly unlocked achievements
 */
export function checkForNewAchievements(
  savedWrappeds: SavedWrappedMinimal[],
  achievementState: AchievementState
): UnlockedAchievement[] {
  const newlyUnlocked: UnlockedAchievement[] = [];
  const alreadyUnlockedIds = new Set(
    achievementState.unlocked.map((u) => u.achievementId)
  );

  for (const achievement of ACHIEVEMENTS) {
    if (alreadyUnlockedIds.has(achievement.id)) continue;
    if (achievement.criteria.type === 'custom') continue;

    const { met } = checkAchievementCriteria(
      achievement,
      savedWrappeds,
      achievementState
    );

    if (met) {
      newlyUnlocked.push({
        achievementId: achievement.id,
        unlockedAt: Date.now(),
        cardCount: savedWrappeds.length,
      });
    }
  }

  return newlyUnlocked;
}

/**
 * Check special time-based achievements
 */
export function checkSpecialAchievements(
  achievementState: AchievementState
): UnlockedAchievement[] {
  const newlyUnlocked: UnlockedAchievement[] = [];
  const alreadyUnlockedIds = new Set(
    achievementState.unlocked.map((u) => u.achievementId)
  );
  const hour = new Date().getHours();

  // Night Owl: after midnight (0-4)
  if (!alreadyUnlockedIds.has('night-owl') && hour >= 0 && hour < 4) {
    newlyUnlocked.push({
      achievementId: 'night-owl',
      unlockedAt: Date.now(),
    });
  }

  // Early Bird: before 6 AM (4-6)
  if (!alreadyUnlockedIds.has('early-bird') && hour >= 4 && hour < 6) {
    newlyUnlocked.push({
      achievementId: 'early-bird',
      unlockedAt: Date.now(),
    });
  }

  return newlyUnlocked;
}

/**
 * Check perfectionist achievement (all fields filled)
 */
export function checkPerfectionistAchievement(
  formData: Record<string, string | number>,
  fieldCount: number,
  achievementState: AchievementState
): UnlockedAchievement | null {
  const alreadyUnlockedIds = new Set(
    achievementState.unlocked.map((u) => u.achievementId)
  );

  if (alreadyUnlockedIds.has('perfectionist')) return null;

  const filledFields = Object.values(formData).filter(
    (v) => v !== '' && v !== undefined && v !== null
  ).length;

  if (filledFields >= fieldCount) {
    return {
      achievementId: 'perfectionist',
      unlockedAt: Date.now(),
    };
  }

  return null;
}

/**
 * Calculate overall completion stats
 */
export function getCompletionStats(savedWrappeds: SavedWrappedMinimal[]) {
  const uniqueCategories = new Set(savedWrappeds.map((w) => w.categoryId));
  const totalSubcategories = MAIN_CATEGORIES.reduce(
    (sum, cat) => sum + cat.subcategories.length,
    0
  );

  return {
    completedCards: uniqueCategories.size,
    totalCards: totalSubcategories,
    percentage: Math.round((uniqueCategories.size / totalSubcategories) * 100),
  };
}

/**
 * Get rarity color classes
 */
export function getRarityClass(rarity: AchievementRarity): string {
  switch (rarity) {
    case 'common':
      return 'text-zinc-400 border-zinc-400';
    case 'rare':
      return 'text-blue-400 border-blue-400';
    case 'epic':
      return 'text-purple-400 border-purple-400';
    case 'legendary':
      return 'text-amber-400 border-amber-400';
    default:
      return '';
  }
}

/**
 * Get rarity background classes for badges
 */
export function getRarityBgClass(rarity: AchievementRarity): string {
  switch (rarity) {
    case 'common':
      return 'bg-zinc-400/20';
    case 'rare':
      return 'bg-blue-400/20';
    case 'epic':
      return 'bg-purple-400/20';
    case 'legendary':
      return 'bg-amber-400/20';
    default:
      return '';
  }
}

// Re-export for convenience
export { getAchievementById, ACHIEVEMENTS, TOTAL_POSSIBLE_POINTS } from '@/lib/achievementsData';
