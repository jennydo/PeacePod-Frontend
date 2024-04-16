import { easeInOut, motion } from 'framer-motion';
import './BouncyText.css'

/// list of states, e.g. start state and end state
const container = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      staggerDirection: 1,  
    },
  },
};

const item = {
  start: { opacity: 0 },
  end: { opacity: 1, y: [0, -50, 0] },
};

const bounceTransition = {
    y: {
        duration: 2,
        repeat: 1,
        ease: easeInOut
    }
}

const BouncyText = ({ text }) => {
  return (
    <motion.div
      variants={container}
      initial="start"
      animate="end"
      className='text-wrapper'
    >
      {[...Array(text.length)].map((_, i) => (
        <motion.p key={i} variants={item} transition={bounceTransition} className='bouncy-letter'>
          {text[i]}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default BouncyText;