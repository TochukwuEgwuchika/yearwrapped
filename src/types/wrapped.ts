export type GradientType = 'magenta' | 'sunset' | 'aurora' | 'cosmic' | 'golden';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: GradientType;
  fields: CategoryField[];
}

export interface CategoryField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'number';
  placeholder?: string;
  required?: boolean;
}

export interface WrappedCard {
  id: string;
  categoryId: string;
  data: Record<string, string | number>;
  imageUrl?: string;
  createdAt: Date;
}

export const CATEGORIES: Category[] = [
  {
    id: 'person-called-most',
    title: 'Person I Called Most',
    description: 'The one who always picks up',
    icon: '📞',
    gradient: 'magenta',
    fields: [
      { id: 'name', label: 'Their Name', type: 'text', placeholder: 'Enter name', required: true },
      { id: 'callCount', label: 'Total Calls', type: 'number', placeholder: '247' },
      { id: 'image', label: 'Their Photo', type: 'image' },
    ],
  },
  {
    id: 'mentor-of-year',
    title: 'Mentor of the Year',
    description: 'The guide who shaped your journey',
    icon: '🌟',
    gradient: 'golden',
    fields: [
      { id: 'name', label: 'Their Name', type: 'text', placeholder: 'Enter name', required: true },
      { id: 'lesson', label: 'Biggest Lesson', type: 'textarea', placeholder: 'What did they teach you?' },
      { id: 'image', label: 'Their Photo', type: 'image' },
    ],
  },
  {
    id: 'friend-of-year',
    title: 'Friend of the Year',
    description: 'Your ride or die',
    icon: '💜',
    gradient: 'cosmic',
    fields: [
      { id: 'name', label: 'Their Name', type: 'text', placeholder: 'Enter name', required: true },
      { id: 'memory', label: 'Best Memory Together', type: 'textarea', placeholder: 'Your favorite moment' },
      { id: 'image', label: 'Their Photo', type: 'image' },
    ],
  },
  {
    id: 'top-5-friends',
    title: 'Top 5 Friends',
    description: 'Your inner circle',
    icon: '👥',
    gradient: 'aurora',
    fields: [
      { id: 'friend1', label: 'Friend #1', type: 'text', placeholder: 'Name', required: true },
      { id: 'friend2', label: 'Friend #2', type: 'text', placeholder: 'Name' },
      { id: 'friend3', label: 'Friend #3', type: 'text', placeholder: 'Name' },
      { id: 'friend4', label: 'Friend #4', type: 'text', placeholder: 'Name' },
      { id: 'friend5', label: 'Friend #5', type: 'text', placeholder: 'Name' },
    ],
  },
  {
    id: 'food-ate-most',
    title: 'Food I Ate Most',
    description: 'Your comfort food of 2025',
    icon: '🍕',
    gradient: 'sunset',
    fields: [
      { id: 'food', label: 'The Food', type: 'text', placeholder: 'Pizza, Sushi, etc.', required: true },
      { id: 'times', label: 'Times Eaten', type: 'number', placeholder: '52' },
      { id: 'image', label: 'Food Photo', type: 'image' },
    ],
  },
  {
    id: 'favorite-movie',
    title: 'Favorite Movie',
    description: 'The film that moved you',
    icon: '🎬',
    gradient: 'cosmic',
    fields: [
      { id: 'title', label: 'Movie Title', type: 'text', placeholder: 'Enter movie name', required: true },
      { id: 'quote', label: 'Favorite Quote', type: 'textarea', placeholder: 'A line that stuck with you' },
      { id: 'image', label: 'Movie Poster', type: 'image' },
    ],
  },
  {
    id: 'favorite-song',
    title: 'Song of the Year',
    description: 'On repeat all year long',
    icon: '🎵',
    gradient: 'magenta',
    fields: [
      { id: 'song', label: 'Song Title', type: 'text', placeholder: 'Enter song name', required: true },
      { id: 'artist', label: 'Artist', type: 'text', placeholder: 'Artist name' },
      { id: 'plays', label: 'Times Played', type: 'number', placeholder: '500' },
    ],
  },
  {
    id: 'top-habits',
    title: 'Top Habits',
    description: 'The routines that shaped you',
    icon: '💪',
    gradient: 'aurora',
    fields: [
      { id: 'habit1', label: 'Habit #1', type: 'text', placeholder: 'e.g., Morning workout', required: true },
      { id: 'habit2', label: 'Habit #2', type: 'text', placeholder: 'e.g., Reading' },
      { id: 'habit3', label: 'Habit #3', type: 'text', placeholder: 'e.g., Meditation' },
      { id: 'streak', label: 'Longest Streak (days)', type: 'number', placeholder: '30' },
    ],
  },
  {
    id: 'highlights-2025',
    title: 'Highlights of 2025',
    description: 'Your year at a glance',
    icon: '✨',
    gradient: 'golden',
    fields: [
      { id: 'highlight1', label: 'Highlight #1', type: 'text', placeholder: 'Your biggest win', required: true },
      { id: 'highlight2', label: 'Highlight #2', type: 'text', placeholder: 'A special moment' },
      { id: 'highlight3', label: 'Highlight #3', type: 'text', placeholder: 'An achievement' },
    ],
  },
  {
    id: 'personal-award',
    title: 'Personal Award',
    description: 'Crown yourself',
    icon: '🏆',
    gradient: 'golden',
    fields: [
      { id: 'award', label: 'Award Title', type: 'text', placeholder: 'e.g., Most Improved', required: true },
      { id: 'reason', label: 'Why You Earned It', type: 'textarea', placeholder: 'What did you accomplish?' },
      { id: 'image', label: 'Your Photo', type: 'image' },
    ],
  },
];
