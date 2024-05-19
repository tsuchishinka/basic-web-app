
const fetchAll = async <T>(
  fetchFunction: (offset: number) => Promise<{ offset: number; total: number; list: T[] }>,
) => {
  const stackedList: T[] = []
  let offset = 0
  while (true) {
    const response = await fetchFunction(offset)
    response.list.forEach((item) => stackedList.push(item))
    if (offset + response.list.length >= response.total) {
      break
    }
    offset += response.list.length
  }
  return stackedList
}

export default fetchAll
