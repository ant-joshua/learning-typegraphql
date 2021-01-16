import { IsEmail, IsString, Length } from "class-validator";
import { User } from "src/entity/User";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./register/IsEmailAlreadyExists";

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  @IsString()
  firstName: string;

  @Field()
  @Length(1, 255)
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already in use" })
  email: string;

  @Field()
  password: string;
}
