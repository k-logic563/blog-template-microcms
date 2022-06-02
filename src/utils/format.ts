import format from 'date-fns/format'

export const formatDate = (dateStr: string) =>
  format(new Date(dateStr), 'yyyy/MM/dd')
