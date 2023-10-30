import { motion } from "framer-motion";
const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      cursor: "pointer",
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };
  
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
const FadeInUp = ({ children, ...props }: any) => {
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" whileInView="animate" animate="animate">
        <motion.div variants={stagger}>
            <motion.div variants={fadeInUp} initial="initial" whileInView="animate">
                {children}
            </motion.div>
        </motion.div>
    </motion.div>
  );
};

export default FadeInUp;
