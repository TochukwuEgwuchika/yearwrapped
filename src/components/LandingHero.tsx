import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onGetStarted: () => void;
}

export const LandingHero = ({ onGetStarted }: LandingHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full gradient-magenta opacity-30 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full gradient-aurora opacity-20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full gradient-sunset opacity-20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm text-muted-foreground backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-wrapped-magenta" />
            Your 2025 Story Awaits
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-foreground">Your Year</span>
          <br />
          <span className="text-gradient-magenta">Wrapped</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Create stunning, shareable cards that celebrate your people, moments, and achievements of 2025.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="group text-lg px-8 py-6 rounded-full gradient-magenta border-0 hover:opacity-90 transition-all duration-300 glow-effect"
          >
            Create Your Wrapped
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Floating cards preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex justify-center items-end gap-4 sm:gap-6"
        >
          {[
            { gradient: 'gradient-magenta', delay: 0, rotate: -6 },
            { gradient: 'gradient-aurora', delay: 0.5, rotate: 0 },
            { gradient: 'gradient-sunset', delay: 1, rotate: 6 },
          ].map((card, i) => (
            <motion.div
              key={i}
              className={`${card.gradient} rounded-2xl sm:rounded-3xl shadow-2xl`}
              style={{
                width: i === 1 ? '140px' : '100px',
                height: i === 1 ? '200px' : '150px',
                transform: `rotate(${card.rotate}deg)`,
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                delay: card.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="p-4 h-full flex flex-col justify-end">
                <div className="w-8 h-1 bg-foreground/30 rounded-full mb-2" />
                <div className="w-12 h-1 bg-foreground/20 rounded-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
