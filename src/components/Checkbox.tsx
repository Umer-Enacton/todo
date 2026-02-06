import { Dialog } from '@headlessui/react';
import React from 'react';

interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export default function Checkbox({
  id,
  name,
  checked = false,
  onChange,
  disabled = false,
  label,
  description,
  className = "",
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy
}: CheckboxProps) {
  const checkboxId = id || name;

  // If no label provided, render standalone checkbox
  if (!label) {
    return (
      <div className={`group grid size-5 grid-cols-1 ${className}`}>
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-slate-900 checked:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-400 forced-colors:appearance-auto "
        />
        <svg
          fill="none"
          viewBox="0 0 14 14"
          className="pointer-events-none col-start-1 row-start-1 size-4 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-400"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={checked ? 'opacity-100' : 'opacity-0'}
          />
        </svg>
      </div>
    );
  }

  // Render checkbox with label
  return (
    <div className={`flex gap-3 ${className}`}>
      <div className="flex h-6 shrink-0 items-center">
        <div className="group grid size-5 grid-cols-1">
          <input
            id={checkboxId}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            
            aria-describedby={description ? `${checkboxId}-description` : ariaDescribedBy}
            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-400 forced-colors:appearance-auto"
          />
          {/* <svg
            fill="none"
            viewBox="0 0 14 14"
            className="pointer-events-none col-start-1 row-start-1 size-4 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-400"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={checked ? 'opacity-100' : 'opacity-0'}
            />
          </svg> */}
        </div>
      </div>
      <div className="text-sm/6">
        <label htmlFor={checkboxId} className="font-medium text-gray-900">
          {label}
        </label>
        {description && (
          <>
            {' '}
            <span id={`${checkboxId}-description`} className="text-gray-500">
              {description}
            </span>
          </>
        )}
      </div>
    </div>
  );
}