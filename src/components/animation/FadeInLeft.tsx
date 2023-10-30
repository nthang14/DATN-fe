import { motion } from "framer-motion";
const fadeInLeft = {
    initial: {
      x: 60,
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
const FadeInLeft = ({ children, ...props }: any) => {
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" whileInView="animate" animate="animate">
			<motion.div variants={stagger} className="h-full">
				<motion.div variants={fadeInLeft} initial="initial" whileInView="animate">
					{children}
				</motion.div>
			</motion.div>
		</motion.div>
  );
};

export default FadeInLeft;
