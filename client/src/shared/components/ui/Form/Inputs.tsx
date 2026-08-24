import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={error || undefined}
      className={[
        "w-full rounded-md border px-3 py-2",
        "bg-slate-900 text-white",
        "focus:outline-none focus:ring-2",
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-slate-600 focus:ring-blue-500",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}