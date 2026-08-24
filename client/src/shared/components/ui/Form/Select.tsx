import type { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children: ReactNode;
}

export function Select({ error, className = "", children, ...props }: SelectProps) {
  return (
    <select
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
    >
      {children}
    </select>
  );
}
