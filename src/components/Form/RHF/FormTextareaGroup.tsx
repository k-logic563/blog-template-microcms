import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FieldNames, IFormInputs } from '@/types/form'

type Props = {
  label: string
  fieldName: FieldNames
}

export const FormTextareaGroup = ({ label, fieldName }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormInputs>()

  return (
    <>
      <label className="mb-[0.4em] inline-block font-medium">{label}</label>
      <div>
        <textarea
          className="textarea textarea-block"
          rows={6}
          data-testid={`test-${fieldName}`}
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
