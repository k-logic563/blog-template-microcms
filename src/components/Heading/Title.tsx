import React from 'react'

type Props = {
  title: string
  subTitle: string
}

export const Title: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <h1 className="text-[clamp(22px,3vw,28px)]">
      <span className="relative mb-[0.1em] flex items-center gap-x-[1em] font-roboto text-[0.8em] font-bold text-teal-500 before:inline-block before:h-[2px] before:w-[40px] before:bg-teal-500 before:content-['']">
        {subTitle}
      </span>
      <p className="font-black tracking-[0.05em]">{title}</p>
    </h1>
  )
}
