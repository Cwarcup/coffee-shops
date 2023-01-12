import type { NextApiRequest, NextApiResponse } from "next"

import { fetchCoffeeStores } from "../../lib/fetchCoffeeStores"

type Data = {
  latLong: string
  limit: number
}

const getCoffeeStoresByLocation = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // configure latLong and limit

  try {
    const { latLong, limit } = req.body as Data

    const response = await fetchCoffeeStores(latLong, limit)
    res.status(200).json(response)
  } catch (error) {
    console.error("there was an error", error)
    res.status(500).json({ error: error })
  }
}

export default getCoffeeStoresByLocation
