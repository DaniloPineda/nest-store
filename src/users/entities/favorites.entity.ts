import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Favorite extends Document {
    @Prop()
    name: string;

    @Prop()
    size: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite)