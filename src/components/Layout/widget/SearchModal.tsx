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

import { BlogContent } from '@/types/type'

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
      <ModalContent className="!max-w-[90%] sm:!max-w-[560px] !max-h-[80vh] !p-6">
        <ModalHeader className="!p-0">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <Icon
                  className="!text-[20px] !md:text-[24px]"
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
          <ModalBody className="!p-0 !mt-4 !max-h-[80vh] !overflow-scroll">
            <ul className="grid gap-[10px] list-none">
              {filteredArticles.map((x) => (
                <li key={x.id}>
                  <Link href={`/blog/${x.id}`} passHref>
                    <a
                      className='block py-[0.8em] px-[0.6em] bg-gray-100 rounded before:content-["#"] before:inline-block before:mr-[0.3em] hover:opacity-60'
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
