import React from 'react'

type Props = {
  title: string
  subTitle: string
}

export const Title: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <h1 className="text-[clamp(22px,3vw,28px)]">
      <span className="font-bold text-teal-500 font-roboto flex items-center gap-x-[1em] text-[0.8em] mb-[0.1em] relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-teal-500 before:inline-block">
        {subTitle}
      </span>
      <p className="font-black tracking-[0.05em]">{title}</p>
    </h1>
  )
}
