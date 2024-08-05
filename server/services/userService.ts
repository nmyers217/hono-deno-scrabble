import { users } from "../db/schema.ts";
import db from "../db/index.ts";

export const getUsers = async () => {
  return await db.select().from(users);
};
