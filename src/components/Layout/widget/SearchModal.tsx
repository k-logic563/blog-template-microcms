import { Modal, Input } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import { BlogContent } from '@/types/microcms'

type Props = {
  opened: boolean
  handleModalEnd: () => void
  handleSearch: (keyword: string) => void
  filteredArticles: BlogContent['contents']
}

const SearchModal: React.FC<Props> = ({
  handleModalEnd,
  opened,
  handleSearch,
  filteredArticles,
}) => {
  return (
    <Modal centered opened={opened} onClose={handleModalEnd}>
      <Input
        data-autofocus
        icon={<AiOutlineSearch />}
        placeholder="ex) javascript"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
        size="md"
      />
      {filteredArticles.length !== 0 && (
        <div className="!mt-4 !max-h-[50vh] !overflow-scroll !p-0">
          <ul className="grid list-none gap-[10px]">
            {filteredArticles.map((x) => (
              <li key={x.id}>
                <Link
                  className="block rounded bg-gray-100 py-[0.8em] px-[0.6em] hover:opacity-60"
                  href={`/blog/${x.id}`}
                  onClick={handleModalEnd}
                >
                  {x.title}
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
