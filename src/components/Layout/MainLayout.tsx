import React, { useEffect, useState } from 'react'
import {
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  useDisclosure,
  Box,
} from '@chakra-ui/react'

import Header from './Header'
import Footer from './Footer'
import SearchModal from './widget/SearchModal'
import { Sidebar } from './widget/Sidebar'

import { theme } from '@/config/chakraTheme'
import { useSearch } from '@/hooks/useSearch'
import { client } from '@/lib/axios'
import { CategoryContent, TagContent } from '@/api/types'

type Props = {
  children: React.ReactNode
}

export type CategoryProps = CategoryContent['contents']
export type TagProps = TagContent['contents']

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { filteredArticles, handleSearch, handleModalEnd, keyword } =
    useSearch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState<CategoryProps>([])
  const [tags, setTags] = useState<TagProps>([])

  const fetchData = async () => {
    try {
      const categoryPromise = client.get<{ contents: CategoryProps }>(
        '/category'
      )
      const tagPromise = client.get<{ contents: TagProps }>('/tag')
      const responses = await Promise.allSettled([categoryPromise, tagPromise])
      const resCategory = responses[0]
      const resTag = responses[1]
      if (resCategory.status === 'fulfilled') {
        setCategories(resCategory.value.data.contents)
      }
      if (resTag.status === 'fulfilled') {
        setTags(resTag.value.data.contents)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Box
        style={{
          display: 'grid',
          gridTemplateRows: '1fr auto',
          minHeight: '100vh',
        }}
      >
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
              <Sidebar categories={categories} tags={tags} />
            </GridItem>
          </Grid>
        </Container>
        <Footer />
      </Box>
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
