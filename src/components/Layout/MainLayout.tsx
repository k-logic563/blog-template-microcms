import React, { useState } from 'react'

import Header from './Header'
import Footer from './Footer'
import { Nav } from './Nav'
import SearchModal from './widget/SearchModal'

import { useSearch } from '@/hooks/useSearch'

type Props = {
  children: React.ReactNode
  isNarrow?: boolean
}

export const MainLayout: React.FC<Props> = ({ children, isNarrow = false }) => {
  const { filteredArticles, handleSearch, keyword } = useSearch()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto]">
        <Header setOpened={setOpened} />
        <Nav />
        <div
          className={`py-12 ${
            isNarrow ? 'mx-auto max-w-screen-md' : 'container'
          }`}
        >
          {children}
        </div>
        <Footer />
      </div>
      <SearchModal
        keyword={keyword}
        opened={opened}
        setOpened={setOpened}
        handleSearch={handleSearch}
        filteredArticles={filteredArticles}
      />
    </>
  )
}
