import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      aria-invalid={error || undefined}
      className={[
        "w-full rounded-md border px-3 py-2 min-h-[100px]",
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
