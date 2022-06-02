import { useState, useEffect } from 'react'

import { BlogContent } from '@/api/types'
import { microClient } from '@/lib/aspida'

export const useSearch = () => {
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
    ;(async () => {
      try {
        const { contents } = await microClient.blogs.$get()
        setArticles(contents)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return {
    keyword,
    filteredArticles,
    handleSearch,
    setArticles,
    handleModalEnd,
  }
}
