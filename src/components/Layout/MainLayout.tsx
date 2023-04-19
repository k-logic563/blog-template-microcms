import React from 'react'

import Footer from './Footer'
import Header from './Header'
import { Nav } from './Nav'
import SearchModal from './widget/SearchModal'

import { useModalSearch } from '@/hooks/useModalSearch'

type Props = {
  children: React.ReactNode
  isNarrow?: boolean
}

export const MainLayout: React.FC<Props> = ({ children, isNarrow = false }) => {
  const { filteredArticles, handleSearch, handleModalEnd, setOpened, opened } =
    useModalSearch()

  return (
    <>
      <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto]">
        <Header setOpened={setOpened} />
        <Nav />
        <div className="overflow-hidden bg-gray-100 py-12">
          <div className={isNarrow ? 'mx-auto max-w-screen-md' : 'container'}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
      <SearchModal
        handleModalEnd={handleModalEnd}
        opened={opened}
        handleSearch={handleSearch}
        filteredArticles={filteredArticles}
      />
    </>
  )
}
