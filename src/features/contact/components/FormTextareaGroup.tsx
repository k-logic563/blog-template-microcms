import { useFormContext } from 'react-hook-form'

import { FieldNames, IFormInputs } from '@/features/contact/types'

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
      <label
        htmlFor={fieldName}
        className="mb-[0.4em] inline-block font-medium"
      >
        {label}
      </label>
      <div>
        <textarea
          id={fieldName}
          className="w-full rounded-lg border p-[0.6em_1em]"
          rows={6}
          {...register(fieldName)}
        />
        {errors[fieldName]?.message && (
          <p className="mt-2 text-sm text-red-600">
            {errors[fieldName]?.message}
          </p>
        )}
      </div>
    </>
  )
}
