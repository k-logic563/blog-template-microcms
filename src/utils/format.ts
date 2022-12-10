import format from 'date-fns/format'

export const formatDate = (dateStr = '') =>
  format(new Date(dateStr), 'yyyy.MM.dd')

export const formatSitemapDate = (dateStr = '') =>
  format(new Date(dateStr), 'yyyy-MM-dd')
