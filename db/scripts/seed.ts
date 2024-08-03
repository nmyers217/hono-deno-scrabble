import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  boards,
  directionEnum,
  games,
  Letter,
  letterEnum,
  moves,
  moveTiles,
  moveTypeEnum,
  players,
  tiles,
  users,
} from "../schema.ts";

const url = Deno.env.get("DATABASE_URL");
if (!url) throw new Error("DATABASE_URL env var is required");
const sql = neon(url);
const db = drizzle(sql);

const letterValues = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
  " ": 0,
};

async function seedMasterData() {
  for (const letter of letterEnum.enumValues) {
    await db.insert(tiles).values({
      letter,
      value: letterValues[letter],
    });
  }
}

async function seed() {
  await seedMasterData();

  const alice = (
    await db
      .insert(users)
      .values({ username: "alice", email: "alice" })
      .returning({ id: users.id })
  ).at(0)!;

  const bob = (
    await db
      .insert(users)
      .values({ username: "bob", email: "bob" })
      .returning({ id: users.id })
  ).at(0)!;

  const game = (
    await db.insert(games).values({}).returning({ id: games.id })
  ).at(0)!;

  const player1 = (
    await db
      .insert(players)
      .values({
        gameId: game.id,
        userId: alice.id,
      })
      .returning({ id: players.id })
  ).at(0)!;
  const player2 = (
    await db
      .insert(players)
      .values({
        gameId: game.id,
        userId: bob.id,
      })
      .returning({ id: players.id })
  ).at(0)!;

  // Moves

  // Board
}

async function main() {
  try {
    await seed();
    console.log("Seeding completed");
  } catch (error) {
    console.error("Error during seeding:", error);
    Deno.exit(1);
  }
}

main();
