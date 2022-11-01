import Link from 'next/link'
import { useRouter } from 'next/router'

import { Image } from '@chakra-ui/react'

export const Logo = () => {
  const { pathname } = useRouter()
  const isTopPage = pathname === '/'

  return (
    <div className="md:text-[20px] font-roboto">
      {isTopPage ? (
        <h1>
          <Image src="/assets/images/logo.png" width="140px" />
        </h1>
      ) : (
        <p>
          <Link href="/">
            <Image src="/assets/images/logo.png" width="140px" />
          </Link>
        </p>
      )}
    </div>
  )
}
