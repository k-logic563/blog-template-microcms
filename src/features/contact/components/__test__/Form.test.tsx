import { zodResolver } from '@hookform/resolvers/zod'
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'

import { schema } from '../../constants'
import { IFormInputs } from '../../types'
import { Form } from '../Form'

afterEach(() => {
  cleanup()
})

describe('フォームテスト', () => {
  it('正常送信', async () => {
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

    render(<TestForm />)

    const nameInput = screen.getByRole('textbox', { name: 'お名前' })
    const emailInput = screen.getByRole('textbox', { name: 'メールアドレス' })
    const messageTextarea = screen.getByRole('textbox', {
      name: 'お問い合わせ内容',
    })
    const submitBtn = screen.getByRole('button', { name: '送信する' })

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

    render(<TestForm />)

    const submitBtn = screen.getByRole('button', { name: '送信する' })

    fireEvent.submit(submitBtn)

    await waitFor(() => {
      expect(screen.getAllByText('必須項目です')).toHaveLength(2)
      expect(
        screen.getByText('メールアドレス形式が違います')
      ).toBeInTheDocument()
    })
  })
})
