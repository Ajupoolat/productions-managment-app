
import { useState } from "react";
import type {
  SelectHTMLAttributes,
  ReactNode,
  FocusEvent,
  MouseEvent,
} from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children: ReactNode;
}

export function Select({
  error,
  className = "",
  children,
  onClick,
  onBlur,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLSelectElement>) => {
    setIsOpen((prev) => !prev);
    onClick?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    setIsOpen(false);
    onBlur?.(e);
  };

  return (
    <div className="relative w-full">
      <select
        {...props}
        onClick={handleClick}
        onBlur={handleBlur}
        aria-invalid={error || undefined}
        className={[
          "w-full appearance-none rounded-md border px-3 py-2 pr-10",
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

      <ChevronDown
        size={18}
        className={[
          "pointer-events-none absolute right-4 top-1/2",
          "-translate-y-1/2 text-slate-400",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "rotate-180" : "rotate-0",
        ].join(" ")}
      />
    </div>
  );
}