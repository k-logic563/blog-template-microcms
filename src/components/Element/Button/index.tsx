import React from 'react'

type Props = React.ComponentPropsWithoutRef<'button'> & {
  testId?: string
  handleClick?: () => void
  text: string
}

export const CustomButton = ({
  testId,
  type,
  disabled = false,
  text,
  handleClick,
}: Props) => {
  return (
    <button
      className="rounded bg-teal-500 py-[.5em] px-[1em] font-bold text-white transition-all duration-150 hover:bg-teal-600"
      data-testid={testId ?? undefined}
      disabled={disabled}
      type={type}
      onClick={handleClick ?? undefined}
    >
      {text}
    </button>
  )
}
