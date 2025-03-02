import React, { useState } from 'react';

interface CustomSelectProps {
  options: string[];
  onSelect: (value: string) => void;
  defaultValue?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onSelect,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]
  );

  const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.textContent || '';

    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        type='button'
        className='border border-outline rounded p-3 w-full text-left flex justify-between items-center'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}

        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>
      {isOpen && (
        <ul className='absolute z-10 mt-2 w-full bg-gray-100 rounded shadow-lg'>
          {options.map((option) => (
            <li
              key={option}
              className='p-3 hover:bg-gray-200 cursor-pointer'
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                e.stopPropagation();
                handleSelect(e);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
