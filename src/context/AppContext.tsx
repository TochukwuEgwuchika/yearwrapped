import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Subcategory } from '@/types/wrapped';
import { AchievementState, UnlockedAchievement } from '@/types/achievements';
import { getAchievementById } from '@/lib/achievementsData';
import { toast } from 'sonner';

interface SavedWrapped {
  id: string;
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  gradient: string;
  formData: Record<string, string | number>;
  imageDataUrl: string;
  timestamp: number;
}

interface AppState {
  view: 'landing' | 'categories' | 'editor' | 'custom' | 'quick-wrapped' | 'saved' | 'achievements';
  selectedCategory: Subcategory | null;
  quickWrappedQueue: Subcategory[];
}

interface AppContextType extends AppState {
  setAppState: (view: AppState['view']) => void;
  setSelectedCategory: (category: Subcategory | null) => void;
  setQuickWrappedQueue: (queue: Subcategory[]) => void;
  saveDraft: (categoryId: string, data: Record<string, string | number>) => void;
  getDraft: (categoryId: string) => Record<string, string | number> | undefined;
  clearDraft: (categoryId: string) => void;
  // Saved wrappeds
  saveWrapped: (category: Subcategory, formData: Record<string, string | number>, imageDataUrl: string) => void;
  getSavedWrappeds: () => SavedWrapped[];
  deleteWrapped: (id: string) => void;
  clearAllWrappeds: () => void;
  // Achievements
  getAchievementState: () => AchievementState;
  unlockAchievement: (achievementId: string) => void;
  markAchievementSeen: (achievementId: string) => void;
  getUnseenAchievements: () => UnlockedAchievement[];
  // User name
  userName: string;
  setUserName: (name: string) => void;
}

const STORAGE_KEY = 'wrapped-saved';
const ACHIEVEMENTS_STORAGE_KEY = 'wrapped-achievements';
const USERNAME_STORAGE_KEY = 'wrapped-username';
const MAX_SAVED_WRAPPEDS = 50; // Limit to prevent storage overflow
const EXPIRY_DAYS = 30; // Auto-delete after 30 days

const defaultAchievementState: AchievementState = {
  unlocked: [],
  seenAchievements: [],
  totalPoints: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<AppState['view']>('landing');
  const [selectedCategory, setSelectedCategory] = useState<Subcategory | null>(null);
  const [quickWrappedQueue, setQuickWrappedQueue] = useState<Subcategory[]>([]);

  // React state for achievements to trigger re-renders
  const [achievementState, setAchievementState] = useState<AchievementState>(() => {
    try {
      const stored = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultAchievementState;
    } catch {
      return defaultAchievementState;
    }
  });

  // React state for saved wrappeds to trigger re-renders
  const [savedWrappeds, setSavedWrappeds] = useState<SavedWrapped[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as SavedWrapped[];
    } catch {
      return [];
    }
  });

  // User name for card watermark
  const [userName, setUserNameState] = useState<string>(() => {
    try {
      return localStorage.getItem(USERNAME_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const setUserName = (name: string) => {
    try {
      localStorage.setItem(USERNAME_STORAGE_KEY, name);
      setUserNameState(name);
    } catch {
      // Storage access failed - ignore
    }
  };

  // Clean up expired wrappeds on mount
  useEffect(() => {
    cleanupExpiredWrappeds();
  }, []);

  const cleanupExpiredWrappeds = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as SavedWrapped[];
      const now = Date.now();
      const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      const valid = saved.filter(w => (now - w.timestamp) < expiryMs);
      if (valid.length !== saved.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
        setSavedWrappeds(valid);
      }
    } catch {
      // Storage access failed - ignore
    }
  };

  // LocalStorage persistence for drafts
  const saveDraft = (categoryId: string, data: Record<string, string | number>) => {
    try {
      const drafts = JSON.parse(localStorage.getItem('wrapped-drafts') || '{}');
      drafts[categoryId] = data;
      localStorage.setItem('wrapped-drafts', JSON.stringify(drafts));
    } catch {
      // Storage access failed - ignore
    }
  };

  const getDraft = (categoryId: string) => {
    try {
      const drafts = JSON.parse(localStorage.getItem('wrapped-drafts') || '{}');
      return drafts[categoryId];
    } catch (e) {
      return undefined;
    }
  };

  const clearDraft = (categoryId: string) => {
    try {
      const drafts = JSON.parse(localStorage.getItem('wrapped-drafts') || '{}');
      delete drafts[categoryId];
      localStorage.setItem('wrapped-drafts', JSON.stringify(drafts));
    } catch {
      // Storage access failed - ignore
    }
  };

  // Saved wrappeds functions
  const saveWrapped = (category: Subcategory, formData: Record<string, string | number>, imageDataUrl: string) => {
    try {
      const newWrapped: SavedWrapped = {
        id: `${category.id}-${Date.now()}`,
        categoryId: category.id,
        categoryTitle: category.title,
        categoryIcon: category.icon,
        gradient: category.gradient,
        formData,
        imageDataUrl,
        timestamp: Date.now(),
      };

      // Read current state from localStorage to avoid stale closure
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as SavedWrapped[];

      // Add to beginning (most recent first)
      const updated = [newWrapped, ...current];

      // Limit total saved
      if (updated.length > MAX_SAVED_WRAPPEDS) {
        updated.pop();
      }

      // Check storage usage and warn if getting full
      const dataStr = JSON.stringify(updated);
      const dataSize = new Blob([dataStr]).size;
      const WARNING_THRESHOLD = 4 * 1024 * 1024; // 4MB warning threshold

      if (dataSize > WARNING_THRESHOLD) {
        toast.warning('Storage is getting full. Consider deleting old cards.');
      }

      localStorage.setItem(STORAGE_KEY, dataStr);
      setSavedWrappeds(updated);
    } catch (e) {
      // Storage quota exceeded or access failed
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        toast.error('Storage full! Please delete some saved cards to save new ones.');
      }
    }
  };

  const getSavedWrappeds = (): SavedWrapped[] => {
    return savedWrappeds;
  };

  const deleteWrapped = (id: string) => {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as SavedWrapped[];
      const filtered = current.filter(w => w.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      setSavedWrappeds(filtered);
    } catch {
      // Storage access failed - ignore
    }
  };

  const clearAllWrappeds = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSavedWrappeds([]);
    } catch {
      // Storage access failed - ignore
    }
  };

  // Achievement functions - now using React state for reactivity
  const getAchievementState = (): AchievementState => {
    return achievementState;
  };

  const saveAchievementStateToStorage = (state: AchievementState) => {
    try {
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage access failed - ignore
    }
  };

  const unlockAchievement = (achievementId: string) => {
    if (achievementState.unlocked.some((u) => u.achievementId === achievementId)) {
      return; // Already unlocked
    }

    const achievement = getAchievementById(achievementId);
    if (!achievement) return;

    const newState: AchievementState = {
      ...achievementState,
      unlocked: [
        ...achievementState.unlocked,
        {
          achievementId,
          unlockedAt: Date.now(),
          cardCount: getSavedWrappeds().length,
        },
      ],
      totalPoints: achievementState.totalPoints + achievement.points,
    };

    setAchievementState(newState);
    saveAchievementStateToStorage(newState);
  };

  const markAchievementSeen = (achievementId: string) => {
    if (achievementState.seenAchievements.includes(achievementId)) {
      return;
    }

    const newState: AchievementState = {
      ...achievementState,
      seenAchievements: [...achievementState.seenAchievements, achievementId],
    };

    setAchievementState(newState);
    saveAchievementStateToStorage(newState);
  };

  const getUnseenAchievements = (): UnlockedAchievement[] => {
    return achievementState.unlocked.filter(
      (u) => !achievementState.seenAchievements.includes(u.achievementId)
    );
  };

  return (
    <AppContext.Provider
      value={{
        view,
        selectedCategory,
        quickWrappedQueue,
        setAppState: setView,
        setSelectedCategory,
        setQuickWrappedQueue,
        saveDraft,
        getDraft,
        clearDraft,
        saveWrapped,
        getSavedWrappeds,
        deleteWrapped,
        clearAllWrappeds,
        getAchievementState,
        unlockAchievement,
        markAchievementSeen,
        getUnseenAchievements,
        userName,
        setUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export type { SavedWrapped };
