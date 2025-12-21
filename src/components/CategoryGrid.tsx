import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, Category } from '@/types/wrapped';

interface CategoryGridProps {
  onSelectCategory: (category: Category) => void;
  onBack: () => void;
}

const gradientClasses: Record<string, string> = {
  magenta: 'gradient-magenta',
  sunset: 'gradient-sunset',
  aurora: 'gradient-aurora',
  cosmic: 'gradient-cosmic',
  golden: 'gradient-golden',
};

export const CategoryGrid = ({ onSelectCategory, onBack }: CategoryGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-magenta">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Select a category to create your personalized wrapped card
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              variants={item}
              onClick={() => onSelectCategory(category)}
              className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 ${gradientClasses[category.gradient]} opacity-80 group-hover:opacity-100 transition-opacity`} />
              
              {/* Content */}
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{category.icon}</span>
                <h3 className="font-display text-lg font-bold text-foreground mb-1 leading-tight">
                  {category.title}
                </h3>
                <p className="text-sm text-foreground/70 line-clamp-2">
                  {category.description}
                </p>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
