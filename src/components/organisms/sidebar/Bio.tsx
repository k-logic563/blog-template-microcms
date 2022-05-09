import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'

export const Bio = () => {
  return (
    <Box>
      <Text fontWeight="bold" mb={1}>
        iwt
      </Text>
      <Image
        src="/assets/images/iwt.jpg"
        alt="iwt"
        w={{ base: '100%', sm: '300px', md: 'auto' }}
        rounded="5px"
        mb={2}
      />
      <Text>
        フロントエンドエンジニアとして働く20代後半。
        <br />
        趣味は読書、筋トレ、カフェ巡り。
      </Text>
    </Box>
  )
}
