import { css } from '@emotion/react'
import { theme } from '@chakra-ui/react'

export const tocList = css`
  list-style-position: inside;
  list-style-type: none;
  color: ${theme.colors.gray['800']};
  font-size: clamp(14px, 1vw, 16px);

  & > li {
    display: flex;
    border-bottom: 1px solid ${theme.colors.gray['300']};

    a {
      display: block;
      padding: 0.3em 0;
      flex: 1;
    }

    a:hover {
      cursor: pointer;
      opacity: 0.6;
    }

    &:before {
      content: '-';
      padding-top: 0.2em;
      display: inline-block;
      color: ${theme.colors.gray['400']};
      margin-right: 0.5em;
    }

    &.h3 {
      margin-left: 1em;
    }

    &.h4 {
      margin-left: 2em;
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

  iframe {
    width: 100% !important;
  }

  img {
    padding: 10px;
    box-shadow: 0 0 5px rgb(0 0 0 / 25%);
    width: calc(100% - 6px);
    margin: 0 auto;
  }

  p {
    margin-bottom: 1em;
    line-height: 1.8;
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
    font-size: clamp(18px, 4vw, 22px);
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

  a {
    color: ${theme.colors.blue['500']};

    &:hover {
      text-decoration: underline;
    }
  }
`
