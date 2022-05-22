import React from 'react'
import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button, Box, Text, Heading } from '@chakra-ui/react'

import Layout from '@/layout'
import { FormInputGroup } from '@/components/molecules/contact/FormInputGroup'
import { FormTextAreaGroup } from '@/components/molecules/contact/FormTextAreaGroup'

import { wait } from '@/utils/commonUtils'

type Props = {
  name: string
  email: string
  contents: string
}

const schema = z.object({
  name: z.string().min(1, { message: '※必須項目です' }),
  email: z
    .string()
    .min(1, { message: '※必須項目です' })
    .email({ message: '※不正なメールアドレスです' }),
  contents: z.string().min(1, { message: '※必須項目です' }),
})

const ContactPage: NextPageWithLayout = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: Props) => {
    await wait(1000)
    alert(JSON.stringify(values, null, 2))
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
      <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
        お問い合わせ
      </Heading>
      <Text mb={10}>
        以下のフォームよりご記入の上、
        <Text as="span" display="inline-block">
          送信してください。
        </Text>
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="grid" rowGap={4} px={1} mb={12}>
          <Box>
            <FormInputGroup
              label="お名前"
              fieldName="name"
              registerProps={register('name')}
              errorMsg={errors.name?.message}
            />
          </Box>
          <Box>
            <FormInputGroup
              label="メールアドレス"
              fieldName="email"
              registerProps={register('email')}
              errorMsg={errors.email?.message}
            />
          </Box>
          <Box>
            <FormTextAreaGroup
              rows={8}
              registerProps={register('contents')}
              fieldName="contents"
              label="お問い合わせ内容"
              errorMsg={errors.contents?.message}
            />
          </Box>
        </Box>
        <Button
          py={6}
          px={8}
          w="100%"
          rounded="5px"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          送信する
        </Button>
      </form>
    </>
  )
}

export default ContactPage

ContactPage.getLayout = (page) => <Layout>{page}</Layout>
