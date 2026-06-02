import { motion } from 'motion/react';
import PodLogo from './PodLogo';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#EFEFE0] z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <PodLogo color="#4A4233" size={120} />
      </motion.div>
      <motion.div
        className="mt-6 text-[#111111] tracking-[-0.02em]"
        style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '48px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        pod
      </motion.div>
    </motion.div>
  );
}
