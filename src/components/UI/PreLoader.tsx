"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, Expo } from "gsap";

declare global {
  interface Window {
    __PRELOADER_DONE__?: boolean;
  }
}

const Preloader = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const totalLength = 2 * Math.PI * 90; // radius = 90

    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = `${totalLength}`;
      circleRef.current.style.strokeDashoffset = `${totalLength}`;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (circleRef.current) {
          const offset = totalLength - (totalLength * next) / 100;
          circleRef.current.style.strokeDashoffset = `${offset}`;
        }
        if (next >= 100) {
          clearInterval(interval);
          reveal();
        }
        return next;
      });
    }, 20);
  }, []);

  const reveal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        window.__PRELOADER_DONE__ = true;
        setDone(true);
      },
    });

    tl.to(".preloader-wrapper", {
      y: "-100%",
      ease: Expo.easeInOut,
      duration: 1,
      delay: 0.3,
    });
  };

  return (
    <>
      {!done && (
        <div className="preloader-wrapper fixed inset-0 bg-slate-900 z-9999 flex items-center justify-center flex-col">
          <div className="relative w-[200px] h-[200px]">
            <svg className="w-full h-full -rotate-90">
              <circle
                ref={circleRef}
                cx="100"
                cy="100"
                r="90"
                stroke="#EC4899"
                strokeWidth="8"
                fill="none"
              />
            </svg>
            <p className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
              {progress}%
            </p>
          </div>
        </div>
      )}

      <div
        className={`transition-opacity duration-700 ${
          done ? "opacity-100" : "opacity-0 pointer-events-none  z-40"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Preloader;
