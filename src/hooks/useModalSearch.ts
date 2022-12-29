import { useState, useEffect } from 'react'
import axios from 'axios'
import { MicroCMSListResponse } from 'microcms-js-sdk'

import { BlogContent, Content } from '@/types/microcms'

type Props = MicroCMSListResponse<Content>

export const useModalSearch = () => {
  const [opened, setOpened] = useState(false)
  const [articles, setArticles] = useState<BlogContent['contents']>([])
  const [filteredArticles, setFilteredArticles] = useState<
    BlogContent['contents']
  >([])

  const handleSearch = (keyword: string) => {
    const word = keyword.trim()

    if (!word || word.length < 3) {
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
    setOpened(false)
    setFilteredArticles([])
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get<Props>('/api/blog/list?limit=100')
      setArticles(data.contents)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    opened,
    setOpened,
    filteredArticles,
    handleSearch,
    setArticles,
    handleModalEnd,
  }
}
