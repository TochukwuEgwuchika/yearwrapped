import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Card {
  id: number;
  gradient: string;
}

const CARDS: Card[] = [
  { id: 0, gradient: "gradient-magenta" },
  { id: 1, gradient: "gradient-aurora" },
  { id: 2, gradient: "gradient-sunset" },
];

export const CardStack = () => {
  const [cards, setCards] = useState(CARDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const lastCard = newCards.pop();
        if (lastCard) {
          newCards.unshift(lastCard);
        }
        return newCards;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-60 w-60 md:h-96 md:w-80">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={`absolute dark:bg-black bg-white rounded-3xl p-4 shadow-2xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between ${card.gradient}`}
            style={{
              transformOrigin: "top center",
              width: "100%",
              height: "100%",
            }}
            animate={{
              top: index * -20,
              scale: 1 - index * 0.05,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200 h-full flex flex-col">
                <div className="bg-noise absolute inset-0 opacity-20" />
                <div className="h-full flex flex-col p-4 z-10">
                    <div className="w-1/3 h-2 bg-white/20 rounded-full mb-4"/>
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 mb-4 blur-sm" />
                        <div className="w-3/4 h-4 bg-white/20 rounded-full blur-[1px]" />
                        <div className="w-1/2 h-3 bg-white/10 rounded-full mt-2 blur-[1px]" />
                    </div>
                    <div className="mt-auto flex justify-between">
                        <div className="w-8 h-8 rounded-full bg-white/10" />
                        <div className="w-8 h-8 rounded-full bg-white/10" />
                    </div>
                </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
