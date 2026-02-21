import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    React.useEffect(() => {
      if (props.value || props.defaultValue) {
        setHasValue(true);
      }
    }, [props.value, props.defaultValue]);

    return (
      <div className="relative w-full">
        {label && (
          <label
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none",
              isFocused || hasValue
                ? "top-2 text-xs text-indigo-600 dark:text-indigo-400"
                : "top-4 text-base text-slate-500 dark:text-slate-400"
            )}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-14 w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 pt-6 pb-2 text-base text-slate-900 dark:text-slate-100 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
            label && "pt-6 pb-2",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            props.onChange?.(e);
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
