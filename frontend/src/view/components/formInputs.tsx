import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
import { CustomSelect } from './selectInput';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const FormInputs = ({
  register,
  errors,
  htmlFor,
  label,
  placeholder,
  type,
  requiredText,
  inputType,
  options,
  values,
  titleField,
  title,
  showFilteredTopics,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  htmlFor: string;
  label: string;
  placeholder: string;
  type: string;
  requiredText?: string;
  inputType: string;
  options?: string[];
  values?: FieldValues;
  titleField?: string;
  title?: string;
  showFilteredTopics?: boolean;
}) => {
  const [query, setQuery] = useState('');
  const topics = useSelector((state: RootState) => state.roadmap.topics);

  const [filteredTopics, setFilteredTopics] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query) {
      setFilteredTopics(
        topics.filter((topic) =>
          topic.toLowerCase().includes(query.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, topics]);

  return (
    <>
      {(titleField || title) && (
        <p className='text-4xl font-serif pb-4'>
          {title
            ? title
            : `Great! Let's start with creating a learning plan for ${
                values?.[titleField as keyof FieldValues]
                  .charAt(0)
                  .toUpperCase() +
                values?.[titleField as keyof FieldValues].slice(1)
              }.`}
        </p>
      )}
      <label htmlFor={htmlFor} className='mb-2  text-lg font-serif'>
        {label}
      </label>
      {type === 'text' && inputType === 'text' && (
        <div className='relative'>
          <input
            id={htmlFor}
            type={type}
            value={query}
            className='border border-outline rounded p-3 focus:outline-none focus:ring-1 focus:ring-inherit w-full'
            placeholder={placeholder}
            onFocus={() => setShowDropdown(true)}
            {...register(htmlFor, {
              required: requiredText,
              onChange: (e) => setQuery(e.target.value),
              onBlur: (e) => {
                // If blur happens but user clicked inside dropdown, prevent hiding
                if (
                  !e.relatedTarget ||
                  !e.relatedTarget.classList.contains('autocomplete-item')
                ) {
                  setShowDropdown(false);
                }
              },
            })}
          />
          {showDropdown &&
            showFilteredTopics &&
            filteredTopics.length > 0 &&
            query && (
              <ul className='absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 w-full max-h-40 overflow-y-auto'>
                {filteredTopics.map((topic, index) => (
                  <li
                    key={index}
                    className='p-2 hover:bg-gray-200 cursor-pointer autocomplete-item'
                    onMouseDown={() => {
                      setQuery(topic);
                      setShowDropdown(false);
                    }}
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            )}
        </div>
      )}

      {type === 'select' && inputType === 'select' && (
        <CustomSelect
          options={options || []}
          onSelect={(value) => {
            register(htmlFor).onChange({
              target: {
                value: value,
                name: htmlFor,
              },
            });
          }}
          defaultValue={options?.[0]}
        />
      )}
      {errors[htmlFor] && (
        <span className='text-red-500 text-sm mt-1'>
          {errors[htmlFor].message as string}
        </span>
      )}
    </>
  );
};

export default FormInputs;
