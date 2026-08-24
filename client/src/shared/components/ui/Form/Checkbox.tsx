import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Checkbox({ error, className = "", ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      {...props}
      aria-invalid={error || undefined}
      className={[
        "w-4 h-4 rounded border cursor-pointer",
        "bg-slate-900 text-primary",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
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
