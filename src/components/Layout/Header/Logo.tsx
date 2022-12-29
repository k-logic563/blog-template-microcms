import Link from 'next/link'
import { useRouter } from 'next/router'

export const Logo = () => {
  const { pathname } = useRouter()
  const isTopPage = pathname === '/'

  return (
    <div className="md:text-[20px]">
      {isTopPage ? (
        <h1>
          <img
            src="/assets/images/logo.png"
            width="140px"
            alt="iwtttter.tech"
          />
        </h1>
      ) : (
        <p>
          <Link href="/" passHref>
            <img
              src="/assets/images/logo.png"
              width="140px"
              alt="iwtttter.tech"
            />
          </Link>
        </p>
      )}
    </div>
  )
}
