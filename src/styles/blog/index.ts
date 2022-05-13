import { css } from '@emotion/react'
import { theme } from '@chakra-ui/react'

export const tocList = css`
  list-style-position: inside;
  list-style-type: none;
  color: ${theme.colors.gray['800']};
  line-height: 1.8;
  font-size: clamp(14px, 3vw, 16px);

  & > li {
    a:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    &:before {
      content: '-';
      display: inline-block;
      color: ${theme.colors.gray['400']};
      margin-right: 0.5em;
    }

    &.h3 {
      padding-left: 0.8em;
    }

    &.h4 {
      padding-left: 1.4em;
    }
  }
`

export const listLink = css`
  transition: opacity 150ms;

  &:hover {
    opacity: 0.6;
  }
`

export const pagination = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(30px, 4vw, 36px);
  height: clamp(30px, 4vw, 36px);
  color: ${theme.colors.teal['500']};
  border: 1px solid ${theme.colors.teal['500']};
  transition: all 150ms;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    text-decoration: none;
    background-color: ${theme.colors.teal['500']};
    color: #fff;
  }

  &.is-active {
    background-color: ${theme.colors.teal['500']};
    color: #fff;
    pointer-events: none;
  }
`

export const contents = css`
  overflow-x: auto;

  code:not(.hljs) {
    color: ${theme.colors.pink['400']};
  }

  p {
    margin-bottom: 1em;
    line-height: 1.8;
  }

  a {
    color: ${theme.colors.blue['600']};
    display: inline-block;
    line-height: 1.4;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }

  ul,
  ol {
    list-style-position: inside;
    line-height: 1.8;
  }

  h2 {
    padding: 0.3em 1em;
    background-color: ${theme.colors.teal['500']};
    color: #fff;
    font-weight: bold;
    font-size: clamp(18px, 5vw, 24px);
    margin: 2em 0 1em;
  }

  h3 {
    border-bottom: 1px solid ${theme.colors.teal['500']};
    font-size: clamp(16px, 4vw, 20px);
    font-weight: bold;
    margin: 1.2em 0 0.8em;
    padding: 0.2em 0.5em;
  }

  blockquote {
    position: relative;
    padding: 10px 15px 10px 50px;
    background: #efefef;
    color: #555;
    margin: 1em 0;
  }

  blockquote:before {
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 5px;
    content: '“';
    font-family: sans-serif;
    color: #cfcfcf;
    font-size: 90px;
    line-height: 1;
  }

  blockquote p {
    padding: 0;
    margin: 10px 0;
    line-height: 1.7;
  }

  blockquote cite {
    display: block;
    text-align: right;
    color: #888888;
    font-size: 0.9em;
  }
`
