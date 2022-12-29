import { memo } from 'react'
import Link from 'next/link'
import { BsTwitter, BsGithub } from 'react-icons/bs'

const Footer = () => {
  return (
    <>
      <div className="bg-white py-8 px-4">
        <div className="mb-4 flex items-center justify-center gap-x-4">
          <a
            href="https://twitter.com/webD_hello21"
            target="_blank"
            rel="noreferrer"
            className="grid h-[42px] w-[42px] place-items-center rounded-full bg-gray-100 text-[20px] transition-all duration-150 hover:bg-gray-200"
          >
            <BsTwitter />
          </a>
          <a
            href="https://github.com/k-logic563"
            target="_blank"
            rel="noreferrer"
            className="grid h-[42px] w-[42px] place-items-center rounded-full bg-gray-100 text-[20px] transition-all duration-150 hover:bg-gray-200"
          >
            <BsGithub />
          </a>
        </div>
        <p className="text-center">
          &copy;{new Date().getFullYear()} iwtttter.tech
          <br />
          <Link
            className="text-xs text-gray-600 hover:underline"
            href="/privacy"
            passHref
          >
            プライバシーポリシー
          </Link>
        </p>
      </div>
    </>
  )
}

export default memo(Footer)
