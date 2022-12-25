import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '../Form'

import { schema } from '@/constants/form'
import { IFormInputs } from '@/types/form'

describe('フォームテスト', () => {
  it('正常に送信できる', async () => {
    const fnSubmit = jest.fn()
    const TestForm = () => {
      const methods = useForm<IFormInputs>({
        resolver: zodResolver(schema),
        shouldFocusError: false,
      })

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(fnSubmit)}>
            <Form mode="init" />
          </form>
        </FormProvider>
      )
    }

    const { getByTestId } = render(<TestForm />)

    const nameInput = getByTestId('test-name')
    const emailInput = getByTestId('test-email')
    const messageTextarea = getByTestId('test-message')
    const submitBtn = getByTestId('test-submit-button')

    fireEvent.change(nameInput, {
      target: {
        value: 'テスト太郎',
      },
    })
    fireEvent.change(emailInput, {
      target: {
        value: 'taro@example.com',
      },
    })
    fireEvent.change(messageTextarea, {
      target: {
        value: 'テストお問い合わせです',
      },
    })

    fireEvent.submit(submitBtn)

    await waitFor(() => {
      expect(fnSubmit).toBeCalled()
    })
  })

  it('エラー表示', async () => {
    const fnSubmit = jest.fn()
    const TestForm = () => {
      const methods = useForm<IFormInputs>({
        resolver: zodResolver(schema),
        shouldFocusError: false,
      })

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(fnSubmit)}>
            <Form mode="init" />
          </form>
        </FormProvider>
      )
    }

    const { getByTestId } = render(<TestForm />)

    const submitBtn = getByTestId('test-submit-button')

    fireEvent.submit(submitBtn)

    await waitFor(() => {
      expect(getByTestId('test-error-name').textContent).toBe('必須項目です')
      expect(getByTestId('test-error-email').textContent).toBe(
        'メールアドレス形式が違います'
      )
      expect(getByTestId('test-error-message').textContent).toBe('必須項目です')
    })
  })
})
