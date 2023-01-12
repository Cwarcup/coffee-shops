import { NextApiRequest, NextApiResponse } from "next"

import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable"

// The getCoffeeStoresById function is used to get the data for a specific record in the coffee-stores table.

const getCoffeeStoresById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // get the id from the query
  const { id } = req.query
  //
  const coffeeStore = await findRecordByFilter(id as string)
  res.status(200).json(coffeeStore)
}

export default getCoffeeStoresById
