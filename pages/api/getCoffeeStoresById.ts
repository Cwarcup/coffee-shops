import { NextApiRequest, NextApiResponse } from "next"

import { findRecordByFilter } from "../../lib/airtable"

// The getCoffeeStoresById function is used to get the data for a specific record in the coffee-stores table.
const getCoffeeStoresById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // get the id from the query
  const { id } = req.query as { id: string }
  try {
    const coffeeStore = await findRecordByFilter(id)



    // if the record exists, return the record
    if (coffeeStore.length !== 0) {
      return res.json(coffeeStore)
    } else {
      return res
        .status(404)
        .json({ message: `Record not found with id: ${id}` })
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" })
  }
}

export default getCoffeeStoresById
