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
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    usernameIdx: index("users_username_idx").on(table.username),
    emailIds: index("users_email_idx").on(table.email),
  }),
);
export type User = typeof users.$inferSelect;

// Game table
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export type Game = typeof games.$inferSelect;

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
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("players_user_id_idx").on(table.userId),
    gameIdx: index("players_game_id_idx").on(table.gameId),
  }),
);
export type Player = typeof players.$inferSelect;

// Tile table
export const tiles = pgTable(
  "tiles",
  {
    id: serial("id").primaryKey(),
    letter: letterEnum("letter").unique().notNull(),
    value: integer("value").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    letterIdx: index("letter_idx").on(table.letter),
  }),
);
export type Tile = typeof tiles.$inferSelect;

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
    point: point("point").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    gameIdx: index("boards_game_id_idx").on(table.gameId),
    gameTileIdx: index("boards_game_id_tile_id_idx").on(
      table.gameId,
      table.tileId,
    ),
  }),
);
export type Board = typeof boards.$inferSelect;

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
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    gameIdx: index("moves_game_id_idx").on(table.gameId),
    playerIdx: index("moves_player_id_idx").on(table.playerId),
    gamePlayerIdx: index("moves_game_id_player_id_idx").on(
      table.gameId,
      table.playerId,
    ),
    wordIdx: index("moves_word_id_idx").on(table.word),
  }),
);
export type Move = typeof moves.$inferSelect;

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
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    moveIdx: index("move_tiles_move_id_idx").on(table.moveId),
  }),
);
export type MoveTile = typeof moveTiles.$inferSelect;

// The players tile trays
export const playerTiles = pgTable(
  "player_tiles",
  {
    id: serial("id").primaryKey(),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
    tileId: integer("tile_id")
      .notNull()
      .references(() => tiles.id),
    order: integer("order").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    playerGameIdx: index("player_tiles_player_id_game_id_idx").on(
      table.playerId,
      table.gameId,
    ),
  }),
);
export type PlayerTile = typeof playerTiles.$inferSelect;

// The bag of tiles for the game
export const bags = pgTable(
  "bags",
  {
    id: serial("id").primaryKey(),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
    tileId: integer("tile_id")
      .notNull()
      .references(() => tiles.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    gameIdx: index("bags_game_id_idx").on(table.gameId),
  }),
);
export type Bag = typeof bags.$inferSelect;
