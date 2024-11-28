import { motion } from 'framer-motion';

interface BounceButtonProps {
  text: string;
  onClick?: () => void;
}

const BounceButton: React.FC<BounceButtonProps> = ({ text, onClick }) => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="rounded bg-fuchsia-700 px-4 py-2 text-sm font-medium text-white mx-0 my-0"
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        onClick={onClick}
      >
        {text}
      </motion.button>
    </div>
  );
};

export default BounceButton;
