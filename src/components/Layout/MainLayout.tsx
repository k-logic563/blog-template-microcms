import React from 'react'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'

import Header from './Header'
import Footer from './Footer'
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
      <div className="grid grid-rows-[1fr_auto] min-h-screen">
        <Header onOpen={onOpen} />
        <div className="container py-12 mt-[52px] md:mt-[72px]">{children}</div>
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
