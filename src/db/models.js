/* Models - blkbit inc. */

/* NPM Imports */
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

/* Exports */
export default class FavoritesModel extends Model {
  static table = 'favorites';

  @field('manga_id') manga_id;
  @field('name') name;
  @field('url') url;
}
