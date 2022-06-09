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
} from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'

import { BlogContent } from '@/api/types'
import * as styles from '@/styles'

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
      <ModalContent maxW={{ base: '90%', sm: '560px' }} maxH="80vh" p={6}>
        <ModalHeader p={0}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <Icon
                  as={AiOutlineSearch}
                  fontSize={{ base: '20px', md: '24px' }}
                />
              }
            />
            <Input
              variant="flushed"
              type="text"
              placeholder="Search the Articles"
              value={keyword}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
        </ModalHeader>
        {filteredArticles.length !== 0 && (
          <ModalBody p={0} mt={8} maxH="80vh" overflow="scroll">
            <ul css={styles.search.list}>
              {filteredArticles.map((x) => (
                <li key={x.id}>
                  <Link href={`/blog/${x.id}`} passHref>
                    <a css={styles.search.link} onClick={onClose}>
                      {x.title}
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
