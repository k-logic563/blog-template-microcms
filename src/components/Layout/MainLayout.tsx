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
import { apiRouteHttp } from '@/lib/axios'

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
  const [categories, setCategories] = useState<Category>([])
  const [tags, setTags] = useState<Tag>([])

  useEffect(() => {
    ;(async () => {
      try {
        const categoryPromise = apiRouteHttp.get<{ contents: Category }>(
          '/api/category'
        )
        const tagPromise = apiRouteHttp.get<{ contents: Tag }>('/api/tag')
        const responses = await Promise.all([categoryPromise, tagPromise])
        setCategories(responses[0].data.contents)
        setTags(responses[1].data.contents)
      } catch (e) {
        console.error(e)
      }
    })()
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