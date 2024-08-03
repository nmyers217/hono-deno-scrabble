import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  point,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Letters enum
export const letterEnum = pgEnum("letter", [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
]);

// Direction enum
export const directionEnum = pgEnum("direction", ["horizontal", "vertical"]);

// Move type enum
export const moveTypeEnum = pgEnum("move_type", [
  "extension", // Adding to an existing word, not starting a new one
  "parallel", // Starting a new word parallel to an existing word
  "cross", // Starting a new word perpendicular to an existing word
  "hook", // Adding to an existing word while starting a new word perpendicular to it
]);

// User table
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    usernameIdx: index("users_username_idx").on(table.username),
    emailIds: index("users_email_idx").on(table.email),
  }),
);

// Game table
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Player table
export const players = pgTable(
  "players",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
    score: integer("score").notNull().default(0),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("players_user_idx").on(table.userId),
    gameIdx: index("players_game_idx").on(table.gameId),
    userGameIdx: index("players_user_game_idx").on(table.userId, table.gameId),
  }),
);

// Tile table
export const tiles = pgTable(
  "tiles",
  {
    id: serial("id").primaryKey(),
    letter: letterEnum("letter").unique().notNull(),
    value: integer("value").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    letterIdx: index("letter_idx").on(table.letter),
  }),
);

// Board table
export const boards = pgTable(
  "boards",
  {
    id: serial("id").primaryKey(),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
    tileId: integer("tile_id")
      .notNull()
      .references(() => tiles.id),
    x: integer("x").notNull(),
    y: integer("y").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    gameIdx: index("boards_game_idx").on(table.gameId),
  }),
);

// Move table
export const moves = pgTable(
  "moves",
  {
    id: serial("id").primaryKey(),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id),
    word: varchar("word", { length: 7 }).notNull(),
    direction: directionEnum("direction").notNull(),
    type: moveTypeEnum("type").notNull(),
    bingo: boolean("bingo").notNull().default(false),
    // TODO: Better way to store secondaries?
    secondaries: text("secondaries").notNull().default(""),
    score: integer("score").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    gamePlayerIdx: index("moves_game_player_idx").on(
      table.gameId,
      table.playerId,
    ),
    gameIdx: index("moves_game_idx").on(table.gameId),
    playerIdx: index("moves_player_idx").on(table.playerId),
    wordIdx: index("moves_word_idx").on(table.word),
  }),
);

// MoveTile table
export const moveTiles = pgTable(
  "move_tiles",
  {
    id: serial("id").primaryKey(),
    moveId: integer("move_id")
      .notNull()
      .references(() => moves.id),
    tileId: integer("tile_id")
      .notNull()
      .references(() => tiles.id),
    point: point("point").notNull(),
    order: integer("order").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    moveIdx: index("move_tiles_move_idx").on(table.moveId),
  }),
);

export type User = typeof users.$inferSelect;
export type Game = typeof games.$inferSelect;
export type Player = typeof players.$inferSelect;
export type Tile = typeof tiles.$inferSelect;
export type Board = typeof boards.$inferSelect;
export type Move = typeof moves.$inferSelect;
export type MoveTile = typeof moveTiles.$inferSelect;
