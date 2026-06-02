import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <select
          ref={ref}
          className={`border rounded-md px-3 py-2 text-sm bg-white text-gray-900 outline-none transition-shadow ${
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
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs" style={{ color: "#DC2626" }}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select;
