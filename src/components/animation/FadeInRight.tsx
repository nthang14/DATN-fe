import { motion } from "framer-motion";
const fadeInRight = {
    initial: {
      x: -60,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };
  
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.4
      }
    }
  };
const FadeInRight = ({ children, ...props }: any) => {
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" whileInView="animate" animate="animate">
			<motion.div className="h-full" variants={stagger}>
				<motion.div className="h-full" variants={fadeInRight} initial="initial" whileInView="animate">
					{children}
				</motion.div>
			</motion.div>
		</motion.div>
  );
};

export default FadeInRight;
