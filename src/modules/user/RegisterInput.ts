import { IsString } from "class-validator";
import { User } from "src/entity/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
