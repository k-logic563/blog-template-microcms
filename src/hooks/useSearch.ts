import { useState, useEffect } from 'react'
import axios from 'axios'
import { MicroCMSListResponse } from 'microcms-js-sdk'

import { BlogContent, Content } from '@/types/type'

type Props = MicroCMSListResponse<Content>

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
        const { data } = await axios.get<Props>('/api/blog/list')
        setArticles(data.contents)
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
