import { memo } from 'react'
import Link from 'next/link'
import { Icon } from '@chakra-ui/react'
import { BsTwitter, BsGithub } from 'react-icons/bs'

const Footer = () => {
  return (
    <>
      <div className="bg-white py-8 px-4">
        <div className="mb-4 flex justify-center items-center gap-x-4">
          <a
            href="https://twitter.com/webD_hello21"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-100 hover:bg-gray-200 transition-all duration-150 w-[42px] h-[42px] grid place-items-center rounded-full text-[20px]"
          >
            <Icon as={BsTwitter} />
          </a>
          <a
            href="https://github.com/k-logic563"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-100 hover:bg-gray-200 transition-all duration-150 w-[42px] h-[42px] grid place-items-center rounded-full text-[20px]"
          >
            <Icon as={BsGithub} />
          </a>
        </div>
        <p className="text-center">
          &copy;{new Date().getFullYear()} iwtttter.tech
          <br />
          <Link href="/privacy" passHref>
            <a className="text-xs text-gray-600 hover:underline">
              プライバシーポリシー
            </a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default memo(Footer)
