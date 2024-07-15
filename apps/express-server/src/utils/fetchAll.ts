const fetchAll = async <T>(
  fetchFunction: (offset: number) => Promise<{ offset: number; total: number; list: T[] }>,
) => {
  const stackedList: T[] = []
  let offset = 0
  let finish = false
  while (!finish) {
    const response = await fetchFunction(offset)
    response.list.forEach((item) => stackedList.push(item))
    if (offset + response.list.length >= response.total) {
      finish = true
    }
    offset += response.list.length
  }
  return stackedList
}

export default fetchAll
