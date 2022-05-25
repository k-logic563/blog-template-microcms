import React from 'react'
import type { InferGetStaticPropsType, NextPageWithLayout } from 'next'

import { Main } from '@/components/pages'
import { microClient } from '@/utils/httpUtils'
import Layout from '@/layout'

export type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const response = await microClient.blogs.$get({
    query: { limit: 4, offset: 0 },
  })
  return {
    props: {
      response,
    },
    revalidate: 1,
  }
}

const HomePage: NextPageWithLayout<HomeProps> = ({ response }) => {
  return <Main response={response} />
}

export default HomePage

HomePage.getLayout = (page) => <Layout>{page}</Layout>
