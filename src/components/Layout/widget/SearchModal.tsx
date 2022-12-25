import React from 'react'
import Link from 'next/link'
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Highlight,
} from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'

import { BlogContent } from '@/types/microcms'

type Props = {
  keyword: string
  onClose: () => void
  isOpen: boolean
  handleSearch: (keyword: string) => void
  handleModalEnd: () => void
  filteredArticles: BlogContent['contents']
}

const SearchModal: React.FC<Props> = ({
  keyword,
  onClose,
  isOpen,
  handleModalEnd,
  handleSearch,
  filteredArticles,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={handleModalEnd}>
      <ModalOverlay />
      <ModalContent className="!max-h-[80vh] !max-w-[90%] !p-6 sm:!max-w-[560px]">
        <ModalHeader className="!p-0">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <Icon
                  className="!md:text-[24px] !text-[20px]"
                  as={AiOutlineSearch}
                />
              }
            />
            <Input
              variant="flushed"
              type="text"
              placeholder="例）キーワードを入力"
              value={keyword}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
        </ModalHeader>
        {filteredArticles.length !== 0 && (
          <ModalBody className="!mt-4 !max-h-[80vh] !overflow-scroll !p-0">
            <ul className="grid list-none gap-[10px]">
              {filteredArticles.map((x) => (
                <li key={x.id}>
                  <Link href={`/blog/${x.id}`} passHref>
                    <a
                      className='block rounded bg-gray-100 py-[0.8em] px-[0.6em] before:mr-[0.3em] before:inline-block before:content-["#"] hover:opacity-60'
                      onClick={onClose}
                    >
                      <Highlight query={keyword} styles={{ bg: 'yellow.100' }}>
                        {x.title}
                      </Highlight>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}

export default SearchModal
