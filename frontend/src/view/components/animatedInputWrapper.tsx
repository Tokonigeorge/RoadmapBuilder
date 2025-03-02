import { motion, AnimatePresence } from 'framer-motion';

const AnimatedInputWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key='step1'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className='flex flex-col max-w-md'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedInputWrapper;
