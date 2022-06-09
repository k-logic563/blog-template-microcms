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
import { microClient } from '@/lib/aspida'
import { useSearch } from '@/hooks/useSearch'

type Props = {
  children: React.ReactNode
  toc?: {
    text: string
    id: string
    name: string
  }[]
}

export const MainLayout = ({ children, toc }: Props) => {
  const { filteredArticles, handleSearch, handleModalEnd, keyword } =
    useSearch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState<CategoryContent['contents']>([])
  const [tags, setTags] = useState<TagContent['contents']>([])

  useEffect(() => {
    ;(async () => {
      // set tag and category
      const categoryPromise = microClient.categories.$get()
      const tagPromise = microClient.tags.$get()

      try {
        const responses = await Promise.all([categoryPromise, tagPromise])
        setCategories(responses[0].contents)
        setTags(responses[1].contents)
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
