import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
} from '@chakra-ui/react'

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
    <FormControl id={fieldName}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        data-testid={`test-${fieldName}`}
        bgColor="white"
        {...register(fieldName)}
      />
      <FormHelperText color="red.500" data-testid={`test-error-${fieldName}`}>
        {errors[fieldName]?.message}
      </FormHelperText>
    </FormControl>
  )
}
