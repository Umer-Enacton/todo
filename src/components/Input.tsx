import React from 'react';

interface Input2Props {
  label?: string;
  name: string;
  id?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shortcut?: string;
  className?: string;
  error?:boolean
}

export default function Input({
  label,
  name,
  id,
  type = "text",
  value,
  placeholder,
  onChange,
  shortcut,
  className = "",
  error
}: Input2Props) {
  const inputId = id || name;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
      )}
      <div className={label ? "mt-2" : ""}>
        <div className={`flex rounded-md bg-white border ${error ? 'border-red-500' : 'border-gray-300'} ${error ? 'focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500' : 'focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900'}`}>
          <input
            id={inputId}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="block min-w-0 grow rounded-md border-0 bg-transparent px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm/6"
          />
          {shortcut && (
            <div className="flex py-1.5 pr-1.5">
              <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-500">
                {shortcut}
              </kbd>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}