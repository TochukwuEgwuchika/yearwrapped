import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Your Year in Data",
    description: "Visualize your year with stunning charts and deep insights.",
    gradient: "gradient-magenta",
    stats: ["365 Days", "8,760 Hours", "Countless Memories"]
  },
  {
    title: "Top Friends",
    description: "Celebrate the people who made your year special.",
    gradient: "gradient-aurora",
    stats: ["Besties", "Squad Goals", "Real Ones"]
  },
  {
    title: "Soundtrack",
    description: "The songs that defined your moments.",
    gradient: "gradient-sunset",
    stats: ["On Repeat", "Top Artist", "Vibe Check"]
  },
  {
    title: "Food & Travel",
    description: "Flavors tasted and places explored.",
    gradient: "gradient-ocean",
    stats: ["Cravings", "Wanderlust", "Hidden Gems"]
  }
];

export const FeaturesStack = () => {
  const container = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
        cards.current.forEach((card, index) => {
            if(!card) return;

            ScrollTrigger.create({
                trigger: card,
                start: "top top+=100",
                end: "bottom bottom",
                pin: true,
                pinSpacing: false,
                id: `card-${index}`
            });

            // Entrance animation
            gsap.fromTo(card,
                { scale: 0.9, opacity: 0.5, y: 100 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=10%",
                        end: "top center",
                        scrub: 1
                    }
                }
            );

             // Fade out previous card slightly
             if (index > 0) {
                 gsap.to(cards.current[index - 1], {
                     scale: 0.95,
                     opacity: 0.5,
                     filter: "blur(5px)",
                     scrollTrigger: {
                         trigger: card,
                         start: "top center",
                         end: "top top",
                         scrub: true
                     }
                 })
             }
        });

        // Return cleanup for matchMedia context
        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.id?.startsWith('card-')) {
                    st.kill();
                }
            });
        };
    });

    // Cleanup matchMedia on unmount
    return () => mm.revert();
  }, { scope: container });

  return (
    <section ref={container} className="relative py-20 px-4 md:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20">
         <h2 className="text-4xl md:text-6xl font-black text-center tracking-tighter uppercase mb-6">
            The <span className="text-gradient-magenta">Collection</span>
         </h2>
         <p className="text-center text-muted-foreground text-xl max-w-2xl mx-auto">
            Everything you need to tell your story, stacked and ready to share.
         </p>
      </div>

      <div className="flex flex-col gap-10 md:gap-0 md:h-[200vh] pb-40">
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            ref={el => { if (el) cards.current[i] = el }}
            className={cn(
                "sticky top-24 md:relative w-full max-w-5xl mx-auto md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10",
                feature.gradient
            )}
          >
            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />
            
            <div className="relative z-10 h-full flex flex-col md:flex-row p-8 md:p-16 gap-8 md:gap-16">
                 <div className="flex-1 flex flex-col justify-center">
                    <div className="w-16 h-1 bg-white/50 rounded-full mb-8" />
                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-[0.9]">
                        {feature.title}
                    </h3>
                    <p className="text-xl md:text-2xl text-white/80 font-medium mb-10 max-w-md">
                        {feature.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                        {feature.stats.map((stat, idx) => (
                            <span key={idx} className="px-6 py-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white font-bold text-sm uppercase tracking-widest">
                                {stat}
                            </span>
                        ))}
                    </div>
                 </div>

                 {/* Visual Placeholder */}
                 <div className="flex-1 relative">
                     <div className="absolute inset-0 bg-black/20 rounded-3xl backdrop-blur-sm border border-white/10 transform rotate-3 transition-transform duration-700 hover:rotate-0 flex items-center justify-center group">
                        <ArrowUpRight className="w-24 h-24 text-white/20 group-hover:text-white/60 transition-colors" />
                     </div>
                 </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
