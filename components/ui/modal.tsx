"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { HiXMark } from "react-icons/hi2";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogPanel
                className={`relative w-full ${sizeClasses[size]} rounded-2xl bg-background border border-[var(--color-primary)]/10 shadow-2xl overflow-hidden`}
              >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-[var(--color-primary)]/10">
                  <DialogTitle className="text-xl font-bold text-[var(--color-text-main)]">
                    {title}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                    aria-label="Close"
                  >
                    <HiXMark className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Content */}
              <div className={title ? "p-6" : "p-6"}>
                {children}
              </div>
              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
