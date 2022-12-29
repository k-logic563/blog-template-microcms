import React from 'react'
import Link from 'next/link'

type Props = React.ComponentPropsWithoutRef<'a'> & {
  text: string
  href: string
}

export const CustomLink = ({ text, href }: Props) => {
  return (
    <Link
      href={href}
      className="rounded bg-teal-500 py-[.5em] px-[1em] font-bold text-white transition-all duration-150 hover:bg-teal-600"
    >
      {text}
    </Link>
  )
}
