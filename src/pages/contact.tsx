import { useState } from 'react'
import type { NextPageWithLayout } from 'next'
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Button,
  Text,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Heading1 } from '@/components/Heading/Heading1'
import { MainLayout } from '@/components/Layout'

interface IFormInputs {
  name: string
  email: string
  message: string
}

const schema = z.object({
  name: z
    .string()
    .min(1, '必須項目です'),
  email: z
    .string()
    .email('メールアドレス形式が違います'),
  message: z
    .string()
    .min(1, '必須項目です'),
})

const ContactPage: NextPageWithLayout = () => {
  const [mode, setMode] = useState('form')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: IFormInputs) => {
    setMode('pending')
    try {
      await axios.post<{ contents: string }>('/api/contact', values)
      setMode('done')
    } catch (e) {
      console.error(e)
      setMode('form')
    }
  }

  return (
    <>
      <NextSeo
        title="お問い合わせ"
        openGraph={{
          title: 'お問い合わせ',
          description: 'iwtttter-blogサイトのお問い合わせページです。',
          url: 'https://iwtttter.tech/contact',
        }}
      />
      <div className="mb-10">
        <Heading1 title="お問い合わせ" subTitle="Contact" />
      </div>
      {mode === 'done' ? (
        <Text lineHeight={1.8}>
          お問い合わせ完了しました。
          <br />
          お返事まで少々お待ちください。
        </Text>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl className="mb-6">
            <FormLabel>お名前</FormLabel>
            <Input type="text" bgColor="white" {...register('name')} />
            <FormHelperText color="red.500">
              {errors.name?.message}
            </FormHelperText>
          </FormControl>
          <FormControl className="mb-6">
            <FormLabel>メールアドレス</FormLabel>
            <Input type="text" bgColor="white" {...register('email')} />
            <FormHelperText color="red.500">
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>お問い合わせ内容</FormLabel>
            <Textarea bgColor="white" {...register('message')} />
            <FormHelperText color="red.500">
              {errors.message?.message}
            </FormHelperText>
          </FormControl>
          <div className="text-center mt-12">
            <Button
              isLoading={mode === 'pending'}
              colorScheme="teal"
              size="md"
              type="submit"
            >
              送信する
            </Button>
          </div>
        </form>
      )}
    </>
  )
}

export default ContactPage

ContactPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
