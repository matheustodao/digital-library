import axios from 'axios'

import { Response, Request } from 'express';

class GoogleBookController {
  async index(req: Request, res: Response) {
    try {
      const filter = req.query as { q: string }

      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${filter.q}`)

      res.json(response.data)
    } catch (err) {
      return err
    }
  }
}

export const googleBookController = new GoogleBookController()
