import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { LoginInput } from "./login/LoginInput";
import { MyContext } from "../../types/MyContext";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return null;
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return null;
    }

    if (!user.confirmed) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
