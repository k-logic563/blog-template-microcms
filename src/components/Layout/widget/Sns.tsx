import { StackDivider, VStack, Text, Icon } from '@chakra-ui/react'
import { GoMarkGithub } from 'react-icons/go'
import { FaTwitter } from 'react-icons/fa'

import * as styles from '@/styles'

const data = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/webD_hello21',
    icon: FaTwitter,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/k-logic563',
    icon: GoMarkGithub,
  },
]

export const Sns = () => {
  return (
    <VStack
      spacing={0}
      px={2}
      align="start"
      divider={<StackDivider borderColor="gray.200" />}
    >
      {data.map((x, i) => (
        <Text
          as="a"
          py={2}
          w="100%"
          key={i}
          href={x.href}
          css={styles.sidebar.link}
          target="_blank"
        >
          <Icon as={x.icon} verticalAlign="middle" mr={2} />
          {x.name}
        </Text>
      ))}
    </VStack>
  )
}
