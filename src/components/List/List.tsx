import { BlogContent } from '@/types/microcms'
import { Item } from './Item'

type Props = {
  contents: BlogContent['contents']
}

export const List = ({ contents }: Props) => {
  return (
    <div className="grid gap-[20px] xs:grid-cols-2 md:gap-x-[24px] md:gap-y-[32px] lg:grid-cols-3">
      {contents.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}
