import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [triviaIndex, setTriviaIndex] = useState(0);

  const trivia = [
    "Did you know? The first movie ever made was 'Roundhay Garden Scene' in 1888.",
    "StreamHub brings premium cinema to your screen",
    "Preparing your personalized recommendations...",
    "Loading your next favorite show...",
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const triviaTimer = setInterval(() => {
      setTriviaIndex((prev) => (prev + 1) % trivia.length);
    }, 2000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(triviaTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Vault Door Animation Placeholder */}
      <motion.div
        className="relative z-10 mb-12 w-64 h-64 bg-primary/20 rounded-full flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-6xl">🎬</div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl bg-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Brand Name */}
      <motion.h1
        className="font-serif text-6xl font-bold mb-4 gradient-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        CineVault
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-lg mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Your Premium Gateway to Cinematic Excellence
      </motion.p>

      {/* Progress Bar */}
      <div className="w-80 mb-6">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.p
          className="text-center text-sm text-muted-foreground mt-3"
          key={progress}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {progress}%
        </motion.p>
      </div>

      {/* Trivia */}
      <motion.p
        key={triviaIndex}
        className="text-sm text-muted-foreground text-center max-w-md px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {trivia[triviaIndex]}
      </motion.p>
    </div>
  );
};
