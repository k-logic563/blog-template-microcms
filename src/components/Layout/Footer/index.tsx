import React, { memo } from 'react'
import { Text, Center } from '@chakra-ui/react'

import pkg from '~/package.json'

const Footer: React.FC = () => {
  return (
    <Center padding={3} bg="teal.500">
      <Text color="white">
        &copy;{new Date().getFullYear()}&ensp;{pkg.name}
      </Text>
    </Center>
  )
}

export default memo(Footer)
