import { useState, useEffect } from 'react'
import type { NextPageWithLayout } from 'next'
import axios from 'axios'
import { NextSeo } from 'next-seo'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Title } from '@/components/Heading/Title'
import { MainLayout } from '@/components/Layout'
import { Form } from '@/feature/contact/Form'

import { schema } from '@/constants/form'
import { Mode, IFormInputs } from '@/types/form'

const ContactPage: NextPageWithLayout = () => {
  const [mode, setMode] = useState<Mode>('init')
  const methods = useForm<IFormInputs>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
  })

  const onSubmit = async (values: IFormInputs) => {
    setMode('pending')
    try {
      await axios.post<{ contents: string }>('/api/contact', values)
      setMode('done')
    } catch (e) {
      console.error(e)
      setMode('init')
    }
  }

  useEffect(() => {
    const {
      setFocus,
      formState: { errors },
    } = methods
    errors && errors.name
      ? setFocus('name')
      : errors.email
      ? setFocus('email')
      : errors.message
      ? setFocus('message')
      : null
  }, [methods.formState.submitCount])

  return (
    <>
      <NextSeo title="お問い合わせ" description="お問い合わせ" />
      <div className="mb-10">
        <Title title="お問い合わせ" subTitle="Contact" />
      </div>
      {mode === 'done' ? (
        <p className="leading-[1.8]">
          お問い合わせ完了しました。
          <br />
          お返事まで少々お待ちください。
        </p>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Form mode={mode} />
          </form>
        </FormProvider>
      )}
    </>
  )
}

export default ContactPage

ContactPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
