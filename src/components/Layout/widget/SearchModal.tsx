import React from 'react'
import Link from 'next/link'
import { Modal, Highlight, Input } from '@mantine/core'
import { AiOutlineSearch } from 'react-icons/ai'

import { BlogContent } from '@/types/microcms'

type Props = {
  keyword: string
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  opened: boolean
  handleSearch: (keyword: string) => void
  filteredArticles: BlogContent['contents']
}

const SearchModal: React.FC<Props> = ({
  keyword,
  setOpened,
  opened,
  handleSearch,
  filteredArticles,
}) => {
  return (
    <Modal centered opened={opened} onClose={() => setOpened(false)}>
      <Input
        icon={<AiOutlineSearch />}
        placeholder="ex) javascript"
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
      />
      {filteredArticles.length !== 0 && (
        <div className="!mt-4 !max-h-[50vh] !overflow-scroll !p-0">
          <ul className="grid list-none gap-[10px]">
            {filteredArticles.map((x) => (
              <li key={x.id}>
                <Link
                  className='block rounded bg-gray-100 py-[0.8em] px-[0.6em] before:mr-[0.3em] before:inline-block before:content-["#"] hover:opacity-60'
                  href={`/blog/${x.id}`}
                  onClick={() => setOpened(false)}
                >
                  <Highlight highlight={keyword} styles={{ bg: 'yellow.100' }}>
                    {x.title}
                  </Highlight>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  )
}

export default SearchModal
