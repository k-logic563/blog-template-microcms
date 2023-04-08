import Link from 'next/link'
import { useRouter } from 'next/router'

export const Logo = () => {
  const { pathname } = useRouter()
  const isTopPage = pathname === '/'

  return (
    <div className="md:text-[20px]">
      {isTopPage ? (
        <h1 className="font-black">blog-template</h1>
      ) : (
        <p>
          <Link href="/" className="font-black">
            blog-template
          </Link>
        </p>
      )}
    </div>
  )
}
