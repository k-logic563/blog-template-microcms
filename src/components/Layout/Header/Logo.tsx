import Link from 'next/link'
import { useRouter } from 'next/router'

export const Logo = () => {
  const { pathname } = useRouter()
  const isTopPage = pathname === '/'

  return (
    <div className="md:text-[20px] font-roboto">
      {isTopPage ? (
        <h1>iwtttter.tech</h1>
      ) : (
        <p>
          <Link href="/" passHref>
            <a>iwtttter.tech</a>
          </Link>
        </p>
      )}
    </div>
  )
}
