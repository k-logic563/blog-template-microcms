import React from 'react'
import { useFormContext } from 'react-hook-form'

import { IFormInputs, FieldNames } from '@/types/form'

type Props = {
  label: string
  fieldName: FieldNames
}

export const FormInputGroup = ({ label, fieldName }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormInputs>()

  return (
    <>
      <label
        className="mb-[0.4em] inline-block font-medium"
        htmlFor={fieldName}
      >
        {label}
      </label>
      <div>
        <input
          id={fieldName}
          className="w-full rounded-lg border p-[0.6em_1em]"
          data-testid={`test-${fieldName}`}
          type="text"
          {...register(fieldName)}
        />
        {errors[fieldName]?.message && (
          <p
            className="mt-2 text-sm text-red-600"
            data-testid={`test-error-${fieldName}`}
          >
            {errors[fieldName]?.message}
          </p>
        )}
      </div>
    </>
  )
}
