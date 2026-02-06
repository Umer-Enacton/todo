import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

interface SelectOption {
  id: string | number;
  title: string;
}

interface Select2Props {
  label?: string;
  name: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: boolean;
  className?: string;
}

export default function Select({
  label,
  name,
  id,
  value,
  onChange,
  options,
  error = false,
  className = ""
}: Select2Props) {
  const selectId = id || name;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
      )}
      <div className={label ? "mt-2 grid grid-cols-1" : "grid grid-cols-1"}>
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${
            error 
              ? 'focus:border-red-500 focus:ring-1 focus:ring-red-500' 
              : 'focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
          } focus:outline-none sm:text-sm/6`}
        >
          {options.map((option) => (
            <option key={option.id} value={option.title}>
              {option.title}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
        />
      </div>
    </div>
  );
}