import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { YEAR } from '@/lib/config';

interface LandingHeroProps {
  onGetStarted: () => void;
}

export const LandingHero = ({ onGetStarted }: LandingHeroProps) => {
  const container = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const yourRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLHeadingElement>(null);
  const wrappedRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!yourRef.current || !yearRef.current || !wrappedRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Badge fade in
    tl.from(badgeRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.6
    });

    // 2. "YOUR" - character cascade with 3D flip
    const yourSplit = SplitText.create(yourRef.current, {
      type: "chars",
      mask: "chars"
    });

    gsap.set(yourSplit.chars, {
      y: 120,
      opacity: 0,
      rotateX: -90,
      transformOrigin: "50% 100%"
    });

    tl.to(yourSplit.chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1,
      stagger: 0.04,
      ease: "power4.out"
    }, "-=0.2");

    // 3. "2025" - scale punch with counter
    const counter = { value: 1900 };
    gsap.set(yearRef.current, { scale: 0.5, opacity: 0 });

    tl.to(yearRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6");

    tl.to(counter, {
      value: YEAR,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        if (yearRef.current) {
          yearRef.current.textContent = Math.round(counter.value).toString();
        }
      }
    }, "<");

    // 4. "WRAPPED" - wave from center
    const wrappedSplit = SplitText.create(wrappedRef.current, {
      type: "chars",
      mask: "chars"
    });

    gsap.set(wrappedSplit.chars, {
      y: 100,
      opacity: 0,
      scale: 0.5
    });

    tl.to(wrappedSplit.chars, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: {
        each: 0.04,
        from: "center"
      },
      ease: "back.out(1.7)"
    }, "-=0.8");

    // 5. Subtitle fade up
    tl.from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, "-=0.4");

    // 6. Button bounce in (no opacity animation - always visible)
    tl.from(buttonRef.current, {
      y: 40,
      scale: 0.9,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Cleanup
    return () => {
      yourSplit.revert();
      wrappedSplit.revert();
    };
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-screen overflow-hidden gradient-magenta"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10">
        {/* Badge */}
        <div ref={badgeRef} className="pill-badge mb-4">
          <span className="pill-badge-dot" />
          <span>Your {YEAR} recap</span>
        </div>

        {/* Headlines */}
        <div className="text-center select-none leading-none">
          <h1 ref={yourRef} className="hero-text">
            YOUR
          </h1>
          <h1 ref={yearRef} className="hero-text-year -mt-4">
            {YEAR}
          </h1>
          <h1 ref={wrappedRef} className="hero-text hero-text-accent -mt-4">
            WRAPPED
          </h1>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero-subtitle mt-6 mb-8 px-4">
          Create stunning, shareable cards for your year's best moments.
        </p>

        {/* CTA Button - ALWAYS VISIBLE */}
        <button
          ref={buttonRef}
          onClick={onGetStarted}
          className="hero-cta z-50"
          style={{ opacity: 1 }}
        >
          Start Your Drop
        </button>
      </div>
    </section>
  );
};
