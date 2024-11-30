import { CLIENT_HTML_PATH } from '@/const/common'
import { RequestHandler } from 'express'

const fetchClientHTML: RequestHandler = async (req, res, next) => {
  try {
    res.sendFile(CLIENT_HTML_PATH)
  } catch (e) {
    next(e)
  }
}

export { fetchClientHTML }
