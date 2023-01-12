import { AirtableRecord } from "./../interfaces/index"
const Airtable = require("airtable")

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
)

// starting point for airtable
const table = base("coffee-stores")

// The getMinifiedRecords function is used to get the data from the first page of the coffee-stores table.
const getMinifiedRecord = (record: AirtableRecord) => {
  return {
    recordId: record.id,
    ...record.fields,
  }
}

// The getMinifiedRecord function is used to get the data for a specific record in the coffee-stores table.
const getMinifiedRecords = (records: AirtableRecord[]) => {
  return records.map((record: AirtableRecord) => getMinifiedRecord(record))
}

// The findRecordByFilter function is used to get the data for a specific record in the coffee-stores table.
const findRecordByFilter = async (id: string) => {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage()

  return getMinifiedRecords(findCoffeeStoreRecords)
}

export { table, getMinifiedRecords, findRecordByFilter }
