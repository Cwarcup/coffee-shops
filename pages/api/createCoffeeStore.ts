import { AirtableReqBody } from "./../../interfaces/index"
import type { NextApiRequest, NextApiResponse } from "next"

import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable"

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      id,
      name,
      address,
      neighborhood,
      cross_street,
      postcode,
      lat,
      lng,
      distance,
      imgUrl,
      voting,
    } = req.query as AirtableReqBody
    try {
      if (id) {
        const records = await findRecordByFilter(id)

        if (records.length !== 0) {
          // if record exists, return the record
          return res.json(records)
        } else {
          // create the record
          if (name) {
            const createRecord = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  cross_street,
                  postcode,
                  lat: parseInt(lat),
                  lng: parseInt(lng),
                  distance: parseInt(distance),
                  imgUrl,
                  voting: voting ? parseInt(voting) : 0,
                },
              },
            ])
            const records = getMinifiedRecords(createRecord)
            res.status(200).json(records)
          } else {
            // if missing a field
            res.status(400).json({ msg: "Missing required field(s): Name" })
          }
        }
      }
    } catch (err) {
      console.error("Error creating or finding a store", err)
      res.statusCode = 500
      res.json({ message: "Error creating or finding a store", err })
    }
  }
}

export default createCoffeeStore
