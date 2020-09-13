// models
import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class FavoritesModel extends Model {
  static table = 'favorites'

  @field('name')
  name

  @field('url')
  url
}