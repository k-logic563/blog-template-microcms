import React, { useEffect, useState } from 'react'
import {
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react'

import Header from './Header'
import Footer from './Footer'
import SearchModal from './widget/SearchModal'
import { Sidebar } from './widget/Sidebar'

import { theme } from '@/config/chakraTheme'
import { CategoryContent, TagContent } from '@/api/types'
import { useSearch } from '@/hooks/useSearch'
import { client } from '@/lib/axios'

type Props = {
  children: React.ReactNode
  toc?: {
    text: string
    id: string
    name: string
  }[]
}

type Category = CategoryContent['contents']
type Tag = TagContent['contents']

export const MainLayout = ({ children, toc }: Props) => {
  const { filteredArticles, handleSearch, handleModalEnd, keyword } =
    useSearch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState<Category | []>()
  const [tags, setTags] = useState<Tag | []>()

  const fetchData = async () => {
    try {
      const categoryPromise = client.get<{ contents: Category }>(
        '/api/category'
      )
      const tagPromise = client.get<{ contents: Tag }>('/api/tag')
      const responses = await Promise.allSettled([categoryPromise, tagPromise])
      const resCategory = responses[0]
      const resTag = responses[1]
      setCategories(
        resCategory.status === 'fulfilled'
          ? resCategory.value.data.contents
          : []
      )
      setTags(resTag.status === 'fulfilled' ? resTag.value.data.contents : [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Header onOpen={onOpen} />
      <Container
        maxW="container.lg"
        py={12}
        mt={{
          base: '52px',
          md: '72px',
        }}
      >
        <Grid
          templateColumns={{ md: '1fr 0.4fr' }}
          columnGap={8}
          rowGap={10}
          alignItems="start"
        >
          <GridItem overflow="auto">{children}</GridItem>
          <GridItem position="sticky" top="6rem">
            <Sidebar toc={toc} categories={categories} tags={tags} />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
      <SearchModal
        keyword={keyword}
        isOpen={isOpen}
        onClose={onClose}
        handleSearch={handleSearch}
        handleModalEnd={handleModalEnd}
        filteredArticles={filteredArticles}
      />
    </ChakraProvider>
  )
}
