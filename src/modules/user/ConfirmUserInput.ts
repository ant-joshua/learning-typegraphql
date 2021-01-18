import { IsString, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ConfirmUserInput {
  @Field()
  @Length(1, 255)
  @IsString()
  token: string;
}
