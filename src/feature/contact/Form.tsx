import React from 'react'

import { FormInputGroup } from '@/components/Form/RHF/FormInputGroup'

import { Mode } from '@/types/form'
import { FormTextareaGroup } from '@/components/Form/RHF/FormTextareaGroup'
import { CustomButton } from '@/components/Element/Button'

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
        <CustomButton
          testId="test-submit-button"
          disabled={mode === 'pending'}
          type="submit"
          text="送信する"
        />
      </div>
    </>
  )
}
