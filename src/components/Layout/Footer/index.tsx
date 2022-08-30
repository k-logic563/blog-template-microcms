import { memo } from 'react'
import Link from 'next/link'
import { Text, Center, Link as CUILink, Box } from '@chakra-ui/react'

import pkg from '~/package.json'

const Footer = () => {
  return (
    <Center padding={6} bg="teal.500">
      <Box textAlign="center">
        <Text color="white">
          &copy;{new Date().getFullYear()}&ensp;{pkg.name}
        </Text>
        <Link href="/privacy" passHref>
          <CUILink color="white" fontSize={12}>
            プライバシーポリシー
          </CUILink>
        </Link>
      </Box>
    </Center>
  )
}

export default memo(Footer)
