import { users } from "../schema.ts";
import db from "../index.ts";

export const getUsers = async () => {
  return await db.select().from(users);
};
