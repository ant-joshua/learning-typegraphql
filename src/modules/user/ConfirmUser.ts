import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { ConfirmUserInput } from "./confirmUserInput";
import { redis } from "../../redis";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("data") { token }: ConfirmUserInput
  ): Promise<boolean> {
    const userId = await redis.get(token);
    if (!userId) {
      return false;
    }

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });

    await redis.del(token);

    return true;
  }
}
