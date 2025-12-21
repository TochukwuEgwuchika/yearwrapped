export type GradientType = 'magenta' | 'sunset' | 'aurora' | 'cosmic' | 'golden' | 'ocean' | 'forest' | 'berry' | 'fire' | 'midnight';

export interface CategoryField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'number';
  placeholder?: string;
  required?: boolean;
}

export interface Subcategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: GradientType;
  fields: CategoryField[];
}

export interface MainCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: GradientType;
  subcategories: Subcategory[];
}

// Legacy support - alias Subcategory as Category
export type Category = Subcategory;

export interface WrappedCard {
  id: string;
  categoryId: string;
  subcategoryId?: string;
  data: Record<string, string | number>;
  imageUrl?: string;
  createdAt: Date;
}

export interface CustomCategory {
  id: string;
  title: string;
  icon: string;
  gradient: GradientType;
  questions: CustomQuestion[];
  createdAt: Date;
}

export interface CustomQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'image' | 'number' | 'list';
  placeholder?: string;
}

// Main Categories with Subcategories
export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'people',
    title: 'People',
    description: 'Celebrate the people who made your year special',
    icon: '👥',
    gradient: 'magenta',
    subcategories: [
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
        id: 'person-called-most',
        title: 'Most Called Contact',
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
        id: 'top-5-friends',
        title: 'Top 5 Friends',
        description: 'Your inner circle',
        icon: '👯',
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
        id: 'group-chat-mvp',
        title: 'Group Chat MVP',
        description: 'Most active group chat member',
        icon: '💬',
        gradient: 'ocean',
        fields: [
          { id: 'name', label: 'Their Name', type: 'text', placeholder: 'Enter name', required: true },
          { id: 'chatName', label: 'Group Chat Name', type: 'text', placeholder: 'The Squad' },
          { id: 'messages', label: 'Messages Sent', type: 'number', placeholder: '5000' },
          { id: 'image', label: 'Their Photo', type: 'image' },
        ],
      },
      {
        id: 'new-friend',
        title: 'Best New Friend',
        description: 'Someone new who became important',
        icon: '🤝',
        gradient: 'sunset',
        fields: [
          { id: 'name', label: 'Their Name', type: 'text', placeholder: 'Enter name', required: true },
          { id: 'howMet', label: 'How You Met', type: 'textarea', placeholder: 'The story of how you met' },
          { id: 'image', label: 'Their Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    description: 'Movies, music, shows and more',
    icon: '🎬',
    gradient: 'cosmic',
    subcategories: [
      {
        id: 'favorite-movie',
        title: 'Movie of the Year',
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
        id: 'favorite-show',
        title: 'TV Show of the Year',
        description: 'The show you binged',
        icon: '📺',
        gradient: 'ocean',
        fields: [
          { id: 'title', label: 'Show Title', type: 'text', placeholder: 'Enter show name', required: true },
          { id: 'episodes', label: 'Episodes Watched', type: 'number', placeholder: '50' },
          { id: 'character', label: 'Favorite Character', type: 'text', placeholder: 'Character name' },
          { id: 'image', label: 'Show Poster', type: 'image' },
        ],
      },
      {
        id: 'top-concert',
        title: 'Best Concert',
        description: 'Live music that moved you',
        icon: '🎤',
        gradient: 'fire',
        fields: [
          { id: 'artist', label: 'Artist/Band', type: 'text', placeholder: 'Enter artist name', required: true },
          { id: 'venue', label: 'Venue', type: 'text', placeholder: 'Concert location' },
          { id: 'highlight', label: 'Best Moment', type: 'textarea', placeholder: 'The highlight of the night' },
          { id: 'image', label: 'Concert Photo', type: 'image' },
        ],
      },
      {
        id: 'top-podcast',
        title: 'Podcast of the Year',
        description: 'Your go-to listen',
        icon: '🎙️',
        gradient: 'midnight',
        fields: [
          { id: 'podcast', label: 'Podcast Name', type: 'text', placeholder: 'Enter podcast name', required: true },
          { id: 'host', label: 'Host(s)', type: 'text', placeholder: 'Host names' },
          { id: 'episode', label: 'Favorite Episode', type: 'text', placeholder: 'Episode title' },
        ],
      },
      {
        id: 'top-book',
        title: 'Book of the Year',
        description: 'Pages that changed you',
        icon: '📚',
        gradient: 'forest',
        fields: [
          { id: 'title', label: 'Book Title', type: 'text', placeholder: 'Enter book title', required: true },
          { id: 'author', label: 'Author', type: 'text', placeholder: 'Author name' },
          { id: 'quote', label: 'Favorite Quote', type: 'textarea', placeholder: 'A line that resonated' },
          { id: 'image', label: 'Book Cover', type: 'image' },
        ],
      },
      {
        id: 'top-game',
        title: 'Game of the Year',
        description: 'Hours well spent',
        icon: '🎮',
        gradient: 'berry',
        fields: [
          { id: 'game', label: 'Game Title', type: 'text', placeholder: 'Enter game name', required: true },
          { id: 'hours', label: 'Hours Played', type: 'number', placeholder: '200' },
          { id: 'achievement', label: 'Best Achievement', type: 'text', placeholder: 'Your proudest moment' },
          { id: 'image', label: 'Game Art', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'food',
    title: 'Food & Dining',
    description: 'Culinary highlights of your year',
    icon: '🍕',
    gradient: 'sunset',
    subcategories: [
      {
        id: 'food-ate-most',
        title: 'Most Eaten Dish',
        description: 'Your comfort food of 2026',
        icon: '🍕',
        gradient: 'sunset',
        fields: [
          { id: 'food', label: 'The Food', type: 'text', placeholder: 'Pizza, Sushi, etc.', required: true },
          { id: 'times', label: 'Times Eaten', type: 'number', placeholder: '52' },
          { id: 'image', label: 'Food Photo', type: 'image' },
        ],
      },
      {
        id: 'best-home-meal',
        title: 'Best Home-Cooked Meal',
        description: 'Kitchen masterpiece',
        icon: '👨‍🍳',
        gradient: 'golden',
        fields: [
          { id: 'dish', label: 'Dish Name', type: 'text', placeholder: 'What you cooked', required: true },
          { id: 'occasion', label: 'The Occasion', type: 'textarea', placeholder: 'What was the occasion?' },
          { id: 'image', label: 'Meal Photo', type: 'image' },
        ],
      },
      {
        id: 'favorite-restaurant',
        title: 'Favorite Restaurant',
        description: 'Your go-to dining spot',
        icon: '🍽️',
        gradient: 'fire',
        fields: [
          { id: 'restaurant', label: 'Restaurant Name', type: 'text', placeholder: 'Restaurant name', required: true },
          { id: 'dish', label: 'Signature Dish', type: 'text', placeholder: 'What you always order' },
          { id: 'visits', label: 'Times Visited', type: 'number', placeholder: '12' },
          { id: 'image', label: 'Restaurant Photo', type: 'image' },
        ],
      },
      {
        id: 'best-coffee',
        title: 'Best Coffee Spot',
        description: 'Your caffeine fix',
        icon: '☕',
        gradient: 'midnight',
        fields: [
          { id: 'cafe', label: 'Cafe Name', type: 'text', placeholder: 'Cafe name', required: true },
          { id: 'drink', label: 'Go-To Order', type: 'text', placeholder: 'Your usual order' },
          { id: 'cups', label: 'Cups Consumed', type: 'number', placeholder: '365' },
        ],
      },
      {
        id: 'best-snack',
        title: 'Snack of the Year',
        description: 'Late-night cravings',
        icon: '🍿',
        gradient: 'berry',
        fields: [
          { id: 'snack', label: 'Snack Name', type: 'text', placeholder: 'Your favorite snack', required: true },
          { id: 'when', label: 'Best Time to Eat', type: 'text', placeholder: 'Midnight, movies, etc.' },
          { id: 'image', label: 'Snack Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'Fashion, purchases and self-care',
    icon: '✨',
    gradient: 'aurora',
    subcategories: [
      {
        id: 'best-purchase',
        title: 'Best Purchase',
        description: 'Money well spent',
        icon: '🛍️',
        gradient: 'golden',
        fields: [
          { id: 'item', label: 'What You Bought', type: 'text', placeholder: 'Item name', required: true },
          { id: 'reason', label: 'Why It Was Worth It', type: 'textarea', placeholder: 'How it changed your life' },
          { id: 'image', label: 'Product Photo', type: 'image' },
        ],
      },
      {
        id: 'favorite-outfit',
        title: 'Favorite Outfit',
        description: 'Your fashion moment',
        icon: '👔',
        gradient: 'magenta',
        fields: [
          { id: 'description', label: 'Outfit Description', type: 'textarea', placeholder: 'Describe the look', required: true },
          { id: 'occasion', label: 'The Occasion', type: 'text', placeholder: 'Where you wore it' },
          { id: 'image', label: 'Outfit Photo', type: 'image' },
        ],
      },
      {
        id: 'self-care-moment',
        title: 'Self-Care Moment',
        description: 'Taking care of you',
        icon: '🧘',
        gradient: 'aurora',
        fields: [
          { id: 'activity', label: 'Self-Care Activity', type: 'text', placeholder: 'Spa day, meditation, etc.', required: true },
          { id: 'feeling', label: 'How It Made You Feel', type: 'textarea', placeholder: 'The impact it had' },
          { id: 'image', label: 'Moment Photo', type: 'image' },
        ],
      },
      {
        id: 'best-hobby',
        title: 'Hobby of the Year',
        description: 'What you loved doing',
        icon: '🎨',
        gradient: 'cosmic',
        fields: [
          { id: 'hobby', label: 'The Hobby', type: 'text', placeholder: 'Painting, gaming, etc.', required: true },
          { id: 'hours', label: 'Hours Spent', type: 'number', placeholder: '100' },
          { id: 'achievement', label: 'Best Achievement', type: 'textarea', placeholder: 'What you accomplished' },
          { id: 'image', label: 'Hobby Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'habits',
    title: 'Habits & Wellness',
    description: 'The routines that shaped you',
    icon: '💪',
    gradient: 'forest',
    subcategories: [
      {
        id: 'top-habits',
        title: 'Top Habits',
        description: 'Daily routines that stuck',
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
        id: 'fitness-stats',
        title: 'Fitness Stats',
        description: 'Your physical achievements',
        icon: '🏃',
        gradient: 'fire',
        fields: [
          { id: 'activity', label: 'Main Activity', type: 'text', placeholder: 'Running, gym, yoga', required: true },
          { id: 'workouts', label: 'Total Workouts', type: 'number', placeholder: '150' },
          { id: 'distance', label: 'Distance (km/miles)', type: 'number', placeholder: '500' },
          { id: 'milestone', label: 'Biggest Milestone', type: 'text', placeholder: 'Your proudest achievement' },
        ],
      },
      {
        id: 'sleep-stats',
        title: 'Sleep Stats',
        description: 'Your rest recap',
        icon: '😴',
        gradient: 'midnight',
        fields: [
          { id: 'avgSleep', label: 'Avg Hours/Night', type: 'number', placeholder: '7.5' },
          { id: 'bestNight', label: 'Best Night of Sleep', type: 'text', placeholder: 'Date or occasion' },
          { id: 'sleepGoal', label: 'Sleep Goal Achieved', type: 'text', placeholder: 'Yes/No or percentage' },
        ],
      },
      {
        id: 'mindfulness',
        title: 'Mindfulness Journey',
        description: 'Mental wellness wins',
        icon: '🧠',
        gradient: 'cosmic',
        fields: [
          { id: 'practice', label: 'Main Practice', type: 'text', placeholder: 'Meditation, journaling', required: true },
          { id: 'sessions', label: 'Total Sessions', type: 'number', placeholder: '200' },
          { id: 'insight', label: 'Biggest Insight', type: 'textarea', placeholder: 'What you learned about yourself' },
        ],
      },
    ],
  },
  {
    id: 'achievements',
    title: 'Achievements',
    description: 'Celebrate your wins',
    icon: '🏆',
    gradient: 'golden',
    subcategories: [
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
      {
        id: 'highlights-2026',
        title: 'Highlights of 2026',
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
        id: 'biggest-win',
        title: 'Biggest Win',
        description: 'Your proudest moment',
        icon: '🎯',
        gradient: 'fire',
        fields: [
          { id: 'win', label: 'The Win', type: 'text', placeholder: 'What you achieved', required: true },
          { id: 'journey', label: 'The Journey', type: 'textarea', placeholder: 'How you got there' },
          { id: 'feeling', label: 'How It Felt', type: 'textarea', placeholder: 'The emotion of winning' },
          { id: 'image', label: 'Celebration Photo', type: 'image' },
        ],
      },
      {
        id: 'learning-milestone',
        title: 'Learning Milestone',
        description: 'New skills acquired',
        icon: '📖',
        gradient: 'ocean',
        fields: [
          { id: 'skill', label: 'Skill Learned', type: 'text', placeholder: 'Coding, language, etc.', required: true },
          { id: 'hours', label: 'Hours Invested', type: 'number', placeholder: '100' },
          { id: 'progress', label: 'Current Level', type: 'text', placeholder: 'Beginner to expert scale' },
        ],
      },
      {
        id: 'goal-achieved',
        title: 'Goal Achieved',
        description: 'Dreams turned reality',
        icon: '🎉',
        gradient: 'magenta',
        fields: [
          { id: 'goal', label: 'The Goal', type: 'text', placeholder: 'What you set out to do', required: true },
          { id: 'timeframe', label: 'Time to Achieve', type: 'text', placeholder: '3 months, 1 year, etc.' },
          { id: 'lesson', label: 'Key Lesson', type: 'textarea', placeholder: 'What you learned' },
        ],
      },
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Adventures and destinations',
    icon: '✈️',
    gradient: 'ocean',
    subcategories: [
      {
        id: 'best-trip',
        title: 'Best Trip',
        description: 'Adventure of the year',
        icon: '✈️',
        gradient: 'ocean',
        fields: [
          { id: 'destination', label: 'Destination', type: 'text', placeholder: 'City, country', required: true },
          { id: 'highlight', label: 'Trip Highlight', type: 'textarea', placeholder: 'Best moment of the trip' },
          { id: 'duration', label: 'Duration (days)', type: 'number', placeholder: '7' },
          { id: 'image', label: 'Trip Photo', type: 'image' },
        ],
      },
      {
        id: 'most-visited-place',
        title: 'Most Visited Place',
        description: 'Your frequent destination',
        icon: '📍',
        gradient: 'sunset',
        fields: [
          { id: 'place', label: 'The Place', type: 'text', placeholder: 'Park, city, cafe', required: true },
          { id: 'visits', label: 'Times Visited', type: 'number', placeholder: '20' },
          { id: 'why', label: 'Why You Keep Going', type: 'textarea', placeholder: 'What draws you back' },
          { id: 'image', label: 'Place Photo', type: 'image' },
        ],
      },
      {
        id: 'bucket-list',
        title: 'Bucket List Check',
        description: 'Dreams you lived',
        icon: '✅',
        gradient: 'aurora',
        fields: [
          { id: 'item', label: 'Bucket List Item', type: 'text', placeholder: 'What you crossed off', required: true },
          { id: 'experience', label: 'The Experience', type: 'textarea', placeholder: 'How it felt to do it' },
          { id: 'image', label: 'Moment Photo', type: 'image' },
        ],
      },
      {
        id: 'road-trip',
        title: 'Best Road Trip',
        description: 'Miles of memories',
        icon: '🚗',
        gradient: 'golden',
        fields: [
          { id: 'route', label: 'The Route', type: 'text', placeholder: 'From - To', required: true },
          { id: 'distance', label: 'Distance (km/miles)', type: 'number', placeholder: '500' },
          { id: 'bestStop', label: 'Best Stop', type: 'text', placeholder: 'Favorite place along the way' },
          { id: 'image', label: 'Road Trip Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'relationships',
    title: 'Relationships',
    description: 'Love and connection',
    icon: '💕',
    gradient: 'berry',
    subcategories: [
      {
        id: 'relationship-milestone',
        title: 'Relationship Milestone',
        description: 'Love celebrated',
        icon: '💕',
        gradient: 'berry',
        fields: [
          { id: 'milestone', label: 'The Milestone', type: 'text', placeholder: 'Anniversary, engagement', required: true },
          { id: 'partner', label: 'With Whom', type: 'text', placeholder: 'Their name' },
          { id: 'memory', label: 'Special Memory', type: 'textarea', placeholder: 'What made it special' },
          { id: 'image', label: 'Memory Photo', type: 'image' },
        ],
      },
      {
        id: 'family-moment',
        title: 'Family Moment',
        description: 'Precious family time',
        icon: '👨‍👩‍👧‍👦',
        gradient: 'golden',
        fields: [
          { id: 'moment', label: 'The Moment', type: 'text', placeholder: 'Reunion, celebration', required: true },
          { id: 'who', label: 'Who Was There', type: 'textarea', placeholder: 'Family members present' },
          { id: 'feeling', label: 'Why It Mattered', type: 'textarea', placeholder: 'The significance' },
          { id: 'image', label: 'Family Photo', type: 'image' },
        ],
      },
      {
        id: 'pet-of-year',
        title: 'Pet of the Year',
        description: 'Furry friend appreciation',
        icon: '🐾',
        gradient: 'sunset',
        fields: [
          { id: 'name', label: 'Pet Name', type: 'text', placeholder: 'Your pet\'s name', required: true },
          { id: 'type', label: 'Type of Pet', type: 'text', placeholder: 'Dog, cat, etc.' },
          { id: 'trait', label: 'Best Trait', type: 'text', placeholder: 'What makes them special' },
          { id: 'image', label: 'Pet Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Learning and growth',
    icon: '🎓',
    gradient: 'midnight',
    subcategories: [
      {
        id: 'course-completed',
        title: 'Course Completed',
        description: 'Knowledge gained',
        icon: '📚',
        gradient: 'ocean',
        fields: [
          { id: 'course', label: 'Course Name', type: 'text', placeholder: 'Course title', required: true },
          { id: 'platform', label: 'Platform', type: 'text', placeholder: 'Where you took it' },
          { id: 'takeaway', label: 'Key Takeaway', type: 'textarea', placeholder: 'Most valuable lesson' },
        ],
      },
      {
        id: 'academic-achievement',
        title: 'Academic Achievement',
        description: 'School/University wins',
        icon: '🎓',
        gradient: 'midnight',
        fields: [
          { id: 'achievement', label: 'The Achievement', type: 'text', placeholder: 'Degree, grade, award', required: true },
          { id: 'subject', label: 'Subject/Field', type: 'text', placeholder: 'Area of study' },
          { id: 'effort', label: 'The Effort', type: 'textarea', placeholder: 'What it took to achieve' },
          { id: 'image', label: 'Achievement Photo', type: 'image' },
        ],
      },
      {
        id: 'life-lesson',
        title: 'Life Lesson Learned',
        description: 'Wisdom gained',
        icon: '💡',
        gradient: 'cosmic',
        fields: [
          { id: 'lesson', label: 'The Lesson', type: 'text', placeholder: 'What you learned', required: true },
          { id: 'context', label: 'How You Learned It', type: 'textarea', placeholder: 'The situation or experience' },
          { id: 'application', label: 'How You\'ll Apply It', type: 'textarea', placeholder: 'Going forward' },
        ],
      },
    ],
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous',
    description: 'Everything else worth celebrating',
    icon: '🎲',
    gradient: 'fire',
    subcategories: [
      {
        id: 'funniest-memory',
        title: 'Funniest Memory',
        description: 'Laughs of the year',
        icon: '😂',
        gradient: 'sunset',
        fields: [
          { id: 'memory', label: 'The Memory', type: 'textarea', placeholder: 'What happened', required: true },
          { id: 'who', label: 'Who Was Involved', type: 'text', placeholder: 'The characters' },
          { id: 'image', label: 'Funny Photo', type: 'image' },
        ],
      },
      {
        id: 'most-embarrassing',
        title: 'Most Embarrassing Moment',
        description: 'Laugh at yourself',
        icon: '🙈',
        gradient: 'berry',
        fields: [
          { id: 'moment', label: 'What Happened', type: 'textarea', placeholder: 'The cringe-worthy moment', required: true },
          { id: 'reaction', label: 'Your Reaction', type: 'text', placeholder: 'How you handled it' },
          { id: 'lesson', label: 'Silver Lining', type: 'text', placeholder: 'What you can laugh about now' },
        ],
      },
      {
        id: 'random-flex',
        title: 'Random Flex',
        description: 'Something you\'re proud of',
        icon: '💪',
        gradient: 'magenta',
        fields: [
          { id: 'flex', label: 'The Flex', type: 'text', placeholder: 'Brag a little', required: true },
          { id: 'proof', label: 'The Proof', type: 'textarea', placeholder: 'Back it up' },
          { id: 'image', label: 'Flex Photo', type: 'image' },
        ],
      },
      {
        id: 'guilty-pleasure',
        title: 'Guilty Pleasure',
        description: 'No judgment zone',
        icon: '🤫',
        gradient: 'cosmic',
        fields: [
          { id: 'pleasure', label: 'The Pleasure', type: 'text', placeholder: 'Your guilty pleasure', required: true },
          { id: 'frequency', label: 'How Often', type: 'text', placeholder: 'Daily, weekly, etc.' },
          { id: 'justification', label: 'Your Justification', type: 'textarea', placeholder: 'Why it\'s okay' },
        ],
      },
    ],
  },
];

// Flatten all subcategories for easy access (legacy support)
export const CATEGORIES: Subcategory[] = MAIN_CATEGORIES.flatMap(
  (mainCat) => mainCat.subcategories
);

// Get subcategory by ID
export const getSubcategoryById = (id: string): Subcategory | undefined => {
  for (const mainCat of MAIN_CATEGORIES) {
    const found = mainCat.subcategories.find((sub) => sub.id === id);
    if (found) return found;
  }
  return undefined;
};

// Get main category by subcategory ID
export const getMainCategoryBySubcategoryId = (subcategoryId: string): MainCategory | undefined => {
  return MAIN_CATEGORIES.find((mainCat) =>
    mainCat.subcategories.some((sub) => sub.id === subcategoryId)
  );
};

// Random question prompts for "surprise me" feature
export const RANDOM_PROMPTS = [
  'Who did you call or message the most?',
  'Your funniest memory of the year?',
  'Favorite meal, snack, or restaurant of 2026?',
  'Top 5 friends you spent most time with?',
  'Mentor of the year?',
  'Your top song/movie/podcast/book?',
  'Most visited place or city?',
  'Biggest personal achievement?',
  'Favorite outfit or fashion moment?',
  'Most repeated habit?',
  'Best purchase of the year?',
  'Most embarrassing moment?',
  'A new skill you learned?',
  'Your travel highlight?',
  'A relationship milestone?',
];
