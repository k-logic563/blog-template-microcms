import { css } from '@emotion/react'
import { theme } from '@chakra-ui/react'

export const list = css`
  display: grid;
  gap: 10px;
  list-style-type: none;
`

export const link = css`
  display: block;
  padding: 0.8em 0.6em;
  background-color: ${theme.colors.gray['200']};
  border-radius: 5px;
  color: ${theme.colors.black};

  &::before {
    content: '#';
    display: inline-block;
    margin-right: 0.3em;
  }

  &:hover {
    opacity: 0.6;
  }
`
