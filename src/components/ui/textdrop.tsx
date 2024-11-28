import { motion } from 'framer-motion'
import DropCharacters from './dropcharacters'


const TextDrop = ({ text }: { text: string }) => {
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={container}>
      <div className='text-center'>
        <DropCharacters
          text={text}
          className="tracking-tight text-3xl md:text-7xl font-bold text-center text-fuchsia-700"
        />
      </div>
    </motion.div>
  )
}

export default TextDrop