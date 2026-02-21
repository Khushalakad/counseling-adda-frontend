"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
}: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className={cn(
                "relative w-full rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800",
                {
                  "max-w-sm": size === "sm",
                  "max-w-md": size === "md",
                  "max-w-2xl": size === "lg",
                  "max-w-4xl": size === "xl",
                }
              )}
            >
              {(title || description) && (
                <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    {title && (
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
