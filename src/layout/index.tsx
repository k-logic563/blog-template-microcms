import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react'

import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import SearchModal from '@/layout/widget/SearchModal'
import { Sidebar } from '@/layout/widget/Sidebar'

import { theme } from '@/config/chakraTheme'
import { BlogContent, CategoryContent, TagContent } from '@/api/types'

type Props = {
  children: React.ReactNode
  toc?: {
    text: string
    id: string
    name: string
  }[]
}

const CATEGORY_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`
const TAG_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tag`

const Layout = ({ children, toc }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [keyword, setKeyword] = useState('')
  const [articles, setArticles] = useState<BlogContent['contents']>([])
  const [filteredArticles, setFilteredArticles] = useState<
    BlogContent['contents']
  >([])
  const [categories, setCategories] = useState<CategoryContent['contents']>([])
  const [tags, setTags] = useState<TagContent['contents']>([])

  const handleSearch = (keyword: string) => {
    const word = keyword.trim()
    setKeyword(word)

    if (!word) {
      setFilteredArticles([])
      return
    }

    const newArticles = articles.filter((x) => {
      const title = x.title.toLocaleLowerCase()
      return title.includes(word)
    })
    setFilteredArticles(newArticles)
  }

  const handleModalEnd = () => {
    setKeyword('')
    setFilteredArticles([])
  }

  useEffect(() => {
    // set tag and category
    const promise1 = axios.get<CategoryContent>(CATEGORY_URL)
    const promise2 = axios.get<TagContent>(TAG_URL)
    Promise.all([promise1, promise2]).then((responses) => {
      setCategories(responses[0].data.contents)
      setTags(responses[1].data.contents)
    })
    // set articles
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
          <GridItem overflowX="scroll">{children}</GridItem>
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

export default Layout
