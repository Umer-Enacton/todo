import React from 'react';

interface TextareaProps {
  label?: string;
  name: string;
  id?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  error?: boolean;
  helperText?: string;
  className?: string;
}

export default function Textarea({
  label,
  name,
  id,
  value,
  placeholder,
  onChange,
  rows = 3,
  error = false,
  helperText,
  className = ""
}: TextareaProps) {
  const textareaId = id || name;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
      )}
      <div className={label ? "mt-2" : ""}>
        <textarea
          id={textareaId}
          name={name}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } placeholder:text-gray-400 ${
            error 
              ? 'focus:border-red-500 focus:ring-1 focus:ring-red-500' 
              : 'focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
          } focus:outline-none sm:text-sm/6`}
        />
        {helperText && (
          <p className={`mt-2 text-sm/6 ${error ? 'text-red-600' : 'text-gray-600'}`}>
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}