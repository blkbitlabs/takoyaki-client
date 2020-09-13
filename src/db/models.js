// models
import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class models extends Model {
  static table = "favoritesdb";

  static associations = {
    columns: {name: "url", type: "string"  }
  };
  @field('url') url;
}