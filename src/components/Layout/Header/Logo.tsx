import React from 'react'
import { Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Logo = () => {
  const { pathname } = useRouter()
  const isTopPage = pathname === '/'

  return (
    <>
      {isTopPage ? (
        <Text
          as="h1"
          color="white"
          fontSize={['lg', 'xl', '4xl']}
          fontWeight="bold"
        >
          <Image
            w={{ base: '120px', md: '140px' }}
            src="/assets/images/logo.png"
            alt="iwtttter"
          />
        </Text>
      ) : (
        <Text fontSize={['lg', 'xl', '4xl']} fontWeight="bold" color="white">
          <Link href="/" passHref>
            <a>
              <Image
                w={{ base: '120px', md: '140px' }}
                src="/assets/images/logo.png"
                alt="iwtttter"
              />
            </a>
          </Link>
        </Text>
      )}
    </>
  )
}
