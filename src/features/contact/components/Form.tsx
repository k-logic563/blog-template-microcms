import { Mode } from '../types'

import { FormInputGroup } from './FormInputGroup'
import { FormTextareaGroup } from './FormTextareaGroup'

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
          disabled={mode === 'pending'}
          type="submit"
          text="送信する"
        />
      </div>
    </>
  )
}
