import React from 'react'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'

import Header from './Header'
import Footer from './Footer'
import { Nav } from './Nav'
import SearchModal from './widget/SearchModal'

import { theme } from '@/config/chakraTheme'
import { useSearch } from '@/hooks/useSearch'

type Props = {
  children: React.ReactNode
}

export const BlogLayout: React.FC<Props> = ({ children }) => {
  const { filteredArticles, handleSearch, handleModalEnd, keyword } =
    useSearch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <ChakraProvider theme={theme}>
      <Header onOpen={onOpen} />
      <Nav />
      <div className="sm:max-w-screen-md mx-auto sm:px-[16px] md:px-0 py-12">
        {children}
      </div>
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
