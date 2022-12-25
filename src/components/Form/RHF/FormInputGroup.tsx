import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react'

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
    <FormControl id={fieldName}>
      <FormLabel>{label}</FormLabel>
      <Input
        data-testid={`test-${fieldName}`}
        type="text"
        bgColor="white"
        {...register(fieldName)}
      />
      <FormHelperText color="red.500" data-testid={`test-error-${fieldName}`}>
        {errors[fieldName]?.message}
      </FormHelperText>
    </FormControl>
  )
}
