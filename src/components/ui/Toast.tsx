import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'info' | 'error';
}

export default function Toast({ message, type }: ToastProps) {
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : Info;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, x: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="toast"
        role="alert"
        aria-live="polite"
      >
        <Icon
          size={16}
          className={
            type === 'success'
              ? 'text-velocity-gold'
              : type === 'error'
              ? 'text-red-400'
              : 'text-velocity-silver'
          }
        />
        <span className="text-velocity-silver">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}
