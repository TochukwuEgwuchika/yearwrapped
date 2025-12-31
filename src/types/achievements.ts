import { GradientType } from './wrapped';

export type AchievementCategory = 'milestone' | 'category' | 'combo' | 'special';

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type AchievementCriteria =
  | { type: 'card_count'; count: number }
  | { type: 'category_complete'; mainCategoryId: string }
  | { type: 'subcategories_complete'; subcategoryIds: string[] }
  | { type: 'all_categories_complete' }
  | { type: 'custom'; checkId: string };

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: GradientType;
  category: AchievementCategory;
  rarity: AchievementRarity;
  criteria: AchievementCriteria;
  points: number;
  hidden?: boolean;
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: number;
  cardCount?: number;
}

export interface AchievementState {
  unlocked: UnlockedAchievement[];
  seenAchievements: string[];
  totalPoints: number;
}

export interface AchievementProgress {
  achievement: Achievement;
  isUnlocked: boolean;
  unlockedAt?: number;
  progress: number;
  progressText: string;
}
