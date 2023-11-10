import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Favorite, FavoriteSchema } from "./favorites.entity";

@Schema()
export class Customer extends Document {
  @Prop()
  name: string;
  
  @Prop()
  lastName: string;
  
  @Prop()
  phone: string;

  @Prop({ type: FavoriteSchema })
  favorite: Favorite

  @Prop({ type: [FavoriteSchema] })
  favorites: Types.Array<Favorite>
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
