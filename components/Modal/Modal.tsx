import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    // Шукаємо елемент
    const modalRoot = document.querySelector('#modal-root');
    
    if (modalRoot) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContainer(modalRoot);
    }

    // Керування скролом
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);


  if (!container) return null;

  return createPortal(
    <div 
      className={css.backdrop} 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    container
  );
};