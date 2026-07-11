import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const ICON_COLORS = {
  success: 'text-emerald-600',
  error: 'text-red-600',
  info: 'text-gray-500',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className='fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm px-4 sm:px-0'>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  const Icon = ICONS[toast.type] || ICONS.success;
  const iconColor = ICON_COLORS[toast.type] || ICON_COLORS.success;

  return (
    <div
      role='status'
      className='flex items-start gap-3 bg-white rounded-lg shadow-lg ring-1 ring-gray-100 p-4 animate-slide-in'
    >
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColor}`} strokeWidth={2} />

      <p className='flex-1 text-sm font-medium text-gray-900 leading-snug'>
        {toast.message}
      </p>

      <button
        onClick={onClose}
        className='shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors'
      >
        <span className='sr-only'>Dismiss</span>
        <X className='h-4 w-4' strokeWidth={2} />
      </button>
    </div>
  );
};

export default Toast;