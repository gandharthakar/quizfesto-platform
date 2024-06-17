'use client';

import React from 'react';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';

// Define Zod schema for the form data
const OptionSchema = z.object({
  optionText: z.string().min(1),
  correctOption: z.enum(['true', 'false']),
});

type Option = z.infer<typeof OptionSchema>;

const OptionForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<{ options: Option[] }>({
    defaultValues: { options: [{ optionText: '', correctOption: 'true' }] },
    mode: 'onChange', // Validate on change
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit: SubmitHandler<{ options: Option[] }> = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            name={`options[${index}].optionText`}
            control={control}
            rules={{ required: 'Option text is required' }}
            render={({ field }) => (
              <input {...field} placeholder="Option text" />
            )}
          />
          {errors.options?.[index]?.optionText && (
            <span>{errors.options[index].optionText.message}</span>
          )}
          <Controller
            name={`options[${index}].correctOption`}
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            )}
          />
          <button type="button" onClick={() => remove(index)}>Delete</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ optionText: '', correctOption: 'true' })}>Add</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default OptionForm;
