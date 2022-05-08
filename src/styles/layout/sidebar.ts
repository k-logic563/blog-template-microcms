import { css } from '@emotion/react'

export const link = css`
  padding: 0.5em 0;
  display: block;
  width: 100%;
  font-size: clamp(14px, 3vw, 16px);

  &:hover {
    opacity: 0.6;
  }
`
