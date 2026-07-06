import { format } from 'date-fns'

const formatDate = (date) => format(date, 'd MMMM yyyy')

const formatDateFromString = (dateString) => {
  try {
    const date = new Date(dateString)
    return date ? formatDate(date) : null
  } catch (e) {
    console.log(e);
  }
}

export { formatDate, formatDateFromString }
