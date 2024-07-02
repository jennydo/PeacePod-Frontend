import { easeInOut, motion } from 'framer-motion';
import './BouncyText.scss';

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
};

const BouncyText = ({ text }) => {
  return (
    <motion.div
      animate="end"
      className='text-wrapper'
      initial="start"
      variants={container}
    >
      {[...Array(text.length)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <motion.p key={i} className='bouncy-letter' transition={bounceTransition}
variants={item}>
          {text[i]}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default BouncyText;