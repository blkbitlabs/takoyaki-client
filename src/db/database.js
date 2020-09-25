/* Database - blkbit inc. */

/* NPM Imports */
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

/* Local Imports */
import { mySchema } from './schema';
import FavoritesModel from './models';

/* Constants */
const ada = new SQLiteAdapter({
  dbName: 'takoyaki',
  schema: mySchema
});

const db = new Database({
  adapter: ada,
  modelClasses: [FavoritesModel],
  actionsEnabled: true
});

/* Exports */
export { db };
