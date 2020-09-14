/* LocalDB Schema - blkbit inc. */
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'favorites',
      columns: [
        { name: "manga_id", type: "string"},
        { name: "url", type: "string" },
        { name: "name", type: "string"}
      ]
    })
  ]
});