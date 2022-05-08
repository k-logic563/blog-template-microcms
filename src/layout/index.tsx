import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  useDisclosure,
  extendTheme,
} from '@chakra-ui/react'

import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import { Sidebar } from '@/layout/widget/Sidebar'
import SearchModal from '@/layout/widget/SearchModal'
import { BlogContent } from '@/api/types'

type Props = {
  children: React.ReactNode
}

const theme = extendTheme({
  fonts: {
    headings:
      'Helvetica Neue, Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    body: 'Helvetica Neue, Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  },
})

const Layout = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [keyword, setKeyword] = useState('')
  const [articles, setArticles] = useState<BlogContent['contents']>([])
  const [filteredArticles, setFilteredArticles] = useState<
    BlogContent['contents']
  >([])

  const handleSearch = (keyword: string) => {
    const word = keyword.trim()
    setKeyword(word)

    if (!word) {
      setFilteredArticles([])
      return
    }

    const newArticles = articles.filter((x) => x.title.includes(word))
    setFilteredArticles(newArticles)
  }

  const handleModalEnd = () => {
    setKeyword('')
    setFilteredArticles([])
  }

  useEffect(() => {
    axios
      .get<BlogContent>('/api/blog')
      .then((res) => {
        setArticles(res.data.contents)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Header onOpen={onOpen} />
      <Container maxW="container.lg" py={12}>
        <Grid
          templateColumns={{ md: 'repeat(4, 1fr)' }}
          columnGap={8}
          rowGap={10}
          alignItems="start"
        >
          <GridItem colSpan={{ md: 3 }}>{children}</GridItem>
          <GridItem position="sticky" top="1rem">
            <Sidebar />
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

export default Layout
