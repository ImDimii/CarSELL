"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ----- BUTTON -----
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-accent text-bg hover:brightness-110 hover:shadow-lg hover:shadow-accent/20",
    secondary:
      "bg-surface border border-white/10 text-text hover:bg-surface-2 hover:border-white/20",
    ghost: "text-text-muted hover:bg-surface hover:text-text",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm min-h-[36px]",
    md: "px-5 py-2.5 text-sm min-h-[44px]",
    lg: "px-8 py-3.5 text-base min-h-[48px]",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

// ----- BADGE -----
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-surface-2 text-text-muted border-white/10",
    accent: "bg-accent/10 text-accent border-accent/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ----- INPUT -----
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-muted"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn("input-field", error && "border-red-500/50", className)}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

// ----- SELECT -----
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-text-muted"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn("input-field", error && "border-red-500/50", className)}
          {...props}
        >
          <option value="">Seleziona...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

// ----- TEXTAREA -----
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-muted"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "input-field min-h-[100px] resize-y",
            error && "border-red-500/50",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ----- MODAL -----
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-count-up",
          sizes[size]
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[.08]">
            <h2 className="text-lg font-semibold text-text">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-muted hover:bg-surface-2 hover:text-text transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ----- SLIDE OVER -----
interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

export function SlideOver({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-lg",
}: SlideOverProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full h-full bg-surface border-l border-white/10 shadow-2xl overflow-y-auto animate-slide-in-right",
          width
        )}
      >
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-surface border-b border-white/[.08]">
            <h2 className="text-lg font-semibold text-text">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-muted hover:bg-surface-2 hover:text-text transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

// ----- TOAST -----
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({
  message,
  type = "info",
  isVisible,
  onClose,
}: ToastProps) {
  if (!isVisible) return null;

  const types = {
    success: "border-emerald-500/30 bg-emerald-500/10",
    error: "border-red-500/30 bg-red-500/10",
    info: "border-accent/30 bg-accent/10",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] animate-fade-up">
      <div
        className={cn(
          "flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg",
          types[type]
        )}
      >
        <span className="text-sm font-medium text-text">{message}</span>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text transition-colors"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
