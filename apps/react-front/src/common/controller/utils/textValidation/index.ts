const isEmail = (text: string) => {
  const regex = /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/
  return regex.test(text)
}

export { isEmail }
