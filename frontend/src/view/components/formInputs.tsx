import { FieldValues, UseFormRegister } from 'react-hook-form';

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
}: {
  register: UseFormRegister<FieldValues>;
  errors: any;
  htmlFor: string;
  label: string;
  placeholder: string;
  type: string;
  requiredText: string;
  inputType: string;
  options?: string[];
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className='mb-2 font-semibold text-lg'>
        {label}
      </label>
      {type === 'text' && inputType === 'text' && (
        <input
          id={htmlFor}
          type={type}
          className='border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder={placeholder}
          {...register(htmlFor, { required: requiredText })}
        />
      )}
      {type === 'select' && inputType === 'select' && (
        <select
          id={htmlFor}
          className='border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
          {...register(htmlFor)}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {errors[htmlFor] && (
        <span className='text-red-500 text-sm mt-1'>
          {errors[htmlFor].message}
        </span>
      )}
    </>
  );
};

export default FormInputs;
