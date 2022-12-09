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

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { filteredArticles, handleSearch, handleModalEnd, keyword } =
    useSearch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <ChakraProvider theme={theme}>
      <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto]">
        <Header onOpen={onOpen} />
        <Nav />
        <div className="container py-12">{children}</div>
        <Footer />
      </div>
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
