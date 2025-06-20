"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipWordsProps extends HTMLMotionProps<"div"> {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  ...props
}: FlipWordsProps) => {
  const hasWords = Array.isArray(words) && words.length > 0;
  const [currentWord, setCurrentWord] = useState(
    hasWords ? words[0] : ""
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    if (!hasWords) return;
    const word =
      words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words, hasWords]);

  useEffect(() => {
    if (!hasWords || isAnimating) return;
    const timeout = setTimeout(() => {
      startAnimation();
    }, duration);

    return () => clearTimeout(timeout);
  }, [isAnimating, duration, startAnimation, hasWords]);

  if (!hasWords) return null; 

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
          className
        )}
        key={currentWord}
        {...(props as any)}
      >
        {currentWord?.split(" ")?.map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className={`inline-block whitespace-nowrap ${
              className || "text-pink-500"
            }`}
            {...(props as any)}
          >
            {word?.split("")?.map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
                {...(props as any)}
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
