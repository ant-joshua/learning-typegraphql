import { IsEmail, IsString, Length } from "class-validator";
import { User } from "src/entity/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  @IsEmail()
  email: string;

  @Field()
  @Length(1, 255)
  @IsString()
  password: string;
}
