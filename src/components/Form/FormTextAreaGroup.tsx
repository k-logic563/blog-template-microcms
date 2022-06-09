import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Text, FormLabel, Textarea } from '@chakra-ui/react'

type Props = {
  registerProps: UseFormRegisterReturn
  fieldName: string
  label: string
  rows?: number
  placeholder?: string
  errorMsg?: string
}

export const FormTextAreaGroup: React.FC<Props> = ({
  registerProps,
  fieldName,
  label,
  rows,
  placeholder,
  errorMsg,
}) => {
  return (
    <>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Textarea
        rows={rows ?? 3}
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
