import React from 'react'
import { Button } from '@chakra-ui/react'

import { FormInputGroup } from '@/components/Form/RHF/FormInputGroup'

import { Mode } from '@/types/form'
import { FormTextareaGroup } from '@/components/Form/RHF/FormTextareaGroup'

type Props = {
  mode: Mode
}

export const Form = ({ mode }: Props) => {
  return (
    <>
      <div className="mb-6">
        <FormInputGroup fieldName="name" label="お名前" />
      </div>
      <div className="mb-6">
        <FormInputGroup fieldName="email" label="メールアドレス" />
      </div>
      <FormTextareaGroup fieldName="message" label="お問い合わせ内容" />
      <div className="mt-12 text-center">
        <Button
          data-testid="test-submit-button"
          isLoading={mode === 'pending'}
          colorScheme="teal"
          size="md"
          type="submit"
        >
          送信する
        </Button>
      </div>
    </>
  )
}
