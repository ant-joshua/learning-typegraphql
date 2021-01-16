import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./RegisterInput";

@Resolver(User)
export class RegisterResolver {
  // private recipesCollection: Recipe[] = [];

  @Query(() => String, { name: "helloWorld", nullable: true })
  async helloWorld() {
    return "hello world";
  }

  @Mutation(() => User)
  async register(@Arg("data") newRegistration: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(newRegistration.password, 12);
    const user = await User.create({
      firstName: newRegistration.firstName,
      lastName: newRegistration.lastName,
      email: newRegistration.email,
      password: hashedPassword,
    }).save();
    return user;
  }
}
