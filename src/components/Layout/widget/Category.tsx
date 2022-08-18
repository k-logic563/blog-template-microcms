import { useEffect, useState } from 'react'
import { StackDivider, VStack, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { client } from '@/lib/axios'
import { CategoryContent } from '@/types/type'
import * as styles from '@/styles'

type CategoryProps = CategoryContent['contents']

export const Category = () => {
  const [data, setData] = useState<CategoryProps>()

  const fetchData = async () => {
    try {
      const { data } = await client.get<{ contents: CategoryProps }>(
        '/category'
      )

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
    <VStack
      spacing={0}
      px={2}
      align="start"
      divider={<StackDivider borderColor="gray.200" />}
    >
      {data.map((x) => (
        <Link key={x.id} href={`/blog/category/${x.id}/1`} passHref>
          <Text as="a" w="100%" py={2} css={styles.sidebar.link}>
            {x.name}
          </Text>
        </Link>
      ))}
    </VStack>
  )
}
