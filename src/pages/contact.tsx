import React from 'react'
import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
// import { useRouter } from 'next/router'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import { Text, Heading } from '@chakra-ui/react'

import { MainLayout } from '@/components/Layout'
// import { FormInputGroup, FormTextAreaGroup } from '@/components/Form'
//
// import { schema } from '@/constants/schema'
// import { wait } from '@/utils/wait'

// type Props = {
//   name: string
//   email: string
//   content: string
// }

const ContactPage: NextPageWithLayout = () => {
  // const { push } = useRouter()
  // const [error, setError] = React.useState('')
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm<Props>({
  //   resolver: zodResolver(schema),
  // })

  // const onSubmit = async (values: Props) => {
  //   try {
  //     await wait(1000)
  //     await push('/thanks')
  //   } catch {
  //     setError('申し訳ありません。エラーにより送信できませんでした。')
  //   }
  // }

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
      <Text>
        現在、フォーム停止しております。
        <br />
        御用の方はSNS TwitterDMよりご連絡していただけると幸いです。
      </Text>
      {/*<Text mb={10}>*/}
      {/*  以下のフォームよりご記入の上、*/}
      {/*  <Text as="span" display="inline-block">*/}
      {/*    送信してください。*/}
      {/*  </Text>*/}
      {/*</Text>*/}
      {/*<form*/}
      {/*  name="contact"*/}
      {/*  data-netlify="true"*/}
      {/*  onSubmit={handleSubmit(onSubmit)}*/}
      {/*>*/}
      {/*  <Box display="grid" rowGap={4} px={1} mb={12}>*/}
      {/*    <Box>*/}
      {/*      <FormInputGroup*/}
      {/*        label="お名前"*/}
      {/*        fieldName="name"*/}
      {/*        registerProps={register('name')}*/}
      {/*        errorMsg={errors.name?.message}*/}
      {/*      />*/}
      {/*    </Box>*/}
      {/*    <Box>*/}
      {/*      <FormInputGroup*/}
      {/*        label="メールアドレス"*/}
      {/*        fieldName="email"*/}
      {/*        registerProps={register('email')}*/}
      {/*        errorMsg={errors.email?.message}*/}
      {/*      />*/}
      {/*    </Box>*/}
      {/*    <Box>*/}
      {/*      <FormTextAreaGroup*/}
      {/*        rows={8}*/}
      {/*        registerProps={register('content')}*/}
      {/*        fieldName="contents"*/}
      {/*        label="お問い合わせ内容"*/}
      {/*        errorMsg={errors.content?.message}*/}
      {/*      />*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*  <Button*/}
      {/*    py={6}*/}
      {/*    px={8}*/}
      {/*    w="100%"*/}
      {/*    rounded="5px"*/}
      {/*    colorScheme="teal"*/}
      {/*    isLoading={isSubmitting}*/}
      {/*    type="submit"*/}
      {/*  >*/}
      {/*    送信する*/}
      {/*  </Button>*/}
      {/*  {error && (*/}
      {/*    <Text*/}
      {/*      mt={4}*/}
      {/*      color="red.600"*/}
      {/*      fontSize="14px"*/}
      {/*      dangerouslySetInnerHTML={{ __html: error }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</form>*/}
    </>
  )
}

export default ContactPage

ContactPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
