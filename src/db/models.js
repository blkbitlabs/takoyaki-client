// models
import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class FavoritesModel extends Model {
  static table = 'favs'

  @field('name')
  name

  @field('url')
  url
}