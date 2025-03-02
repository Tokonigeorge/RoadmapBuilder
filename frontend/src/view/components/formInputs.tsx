import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
import { CustomSelect } from './selectInput';

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
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  htmlFor: string;
  label: string;
  placeholder: string;
  type: string;
  requiredText: string;
  inputType: string;
  options?: string[];
  values?: FieldValues;
  titleField?: string;
  title?: string;
}) => {
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
        <input
          id={htmlFor}
          type={type}
          className='border border-outline rounded p-3 focus:outline-none focus:ring-1 focus:ring-inherit'
          placeholder={placeholder}
          {...register(htmlFor, { required: requiredText })}
        />
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
