import React, { memo } from 'react'
import { Box, Flex, Container } from '@chakra-ui/react'

import { Logo } from './Logo'
import { Menu } from './Menu'

type Props = {
  onOpen: () => void
}

const Index: React.FC<Props> = ({ onOpen }) => {
  return (
    <Box
      bg="teal.500"
      h={{
        base: '52px',
        md: '72px',
      }}
      display="grid"
      placeItems="center"
      position="fixed"
      top={0}
      zIndex={1000}
      width="100%"
    >
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          <Logo />
          <Menu onOpen={onOpen} />
        </Flex>
      </Container>
    </Box>
  )
}

export default memo(Index)
