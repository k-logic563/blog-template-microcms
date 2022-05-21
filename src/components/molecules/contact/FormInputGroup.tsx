import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Text, FormLabel, Input } from '@chakra-ui/react'

type Props = {
  registerProps: UseFormRegisterReturn
  fieldName: string
  label: string
  placeholder?: string
  errorMsg?: string
}

export const FormInputGroup: React.FC<Props> = ({
  registerProps,
  fieldName,
  label,
  placeholder,
  errorMsg,
}) => {
  return (
    <>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Input
        id={fieldName}
        placeholder={placeholder ?? ''}
        {...registerProps}
      />
      {errorMsg && (
        <Text mt={2} color={'red.600'} fontSize="12px">
          {errorMsg}
        </Text>
      )}
    </>
  )
}
