import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Flex, Icon } from '@chakra-ui/react'
import { AiOutlineTag } from 'react-icons/ai'

import { client } from '@/lib/axios'
import { TagContent } from '@/types/type'
import * as styles from '@/styles'

type TagProps = TagContent['contents']

export const Tag = () => {
  const [data, setData] = useState<TagProps>()

  const fetchData = async () => {
    try {
      const { data } = await client.get<{ contents: TagProps }>('/tag')

      setData(data.contents)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) return <p>loading...</p>

  return (
    <Flex gap={2} align="center" flexWrap="wrap" px={2}>
      {data.map((x) => (
        <Link key={x.id} href={`/blog/tag/${x.id}/1`} passHref>
          <a css={styles.sidebar.link}>
            <Icon verticalAlign="middle" mr={1} as={AiOutlineTag} />
            {x.name}
          </a>
        </Link>
      ))}
    </Flex>
  )
}
