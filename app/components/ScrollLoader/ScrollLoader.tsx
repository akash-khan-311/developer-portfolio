'use client'
import { useScroll, motion } from "framer-motion";
const ScrollLoader = () => {
  const scrollYProgress = useScroll().scrollYProgress
  return (
    <motion.div className="bg-[#EC4899] origin-left w-full h-1 fixed top-0 z-[999] left-0" style={{ scaleX: scrollYProgress }}>

    </motion.div>
  );
};

export default ScrollLoader;