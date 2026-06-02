import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          className={`border rounded-md px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 outline-none transition-shadow ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          style={{ boxShadow: "none" }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#111111";
            e.currentTarget.style.boxShadow = "0 0 0 2px #d4d4d4";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? "#EF4444" : "#D1D5DB";
            e.currentTarget.style.boxShadow = "none";
          }}
          {...props}
        />
        {error && (
          <p className="text-xs" style={{ color: "#DC2626" }}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
