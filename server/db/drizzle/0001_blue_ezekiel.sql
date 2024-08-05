CREATE TABLE IF NOT EXISTS "bags" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"tile_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_tiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" integer NOT NULL,
	"game_id" integer NOT NULL,
	"tile_id" integer NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "boards" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "boards" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "games" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "games" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "move_tiles" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "move_tiles" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "moves" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "moves" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "players" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "players" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "tiles" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "tiles" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
DROP INDEX IF EXISTS "boards_game_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "move_tiles_move_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "moves_game_player_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "moves_game_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "moves_player_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "moves_word_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "players_user_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "players_game_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "players_user_game_idx";--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "point" "point" NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bags" ADD CONSTRAINT "bags_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bags" ADD CONSTRAINT "bags_tile_id_tiles_id_fk" FOREIGN KEY ("tile_id") REFERENCES "public"."tiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_tiles" ADD CONSTRAINT "player_tiles_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_tiles" ADD CONSTRAINT "player_tiles_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_tiles" ADD CONSTRAINT "player_tiles_tile_id_tiles_id_fk" FOREIGN KEY ("tile_id") REFERENCES "public"."tiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bags_game_id_idx" ON "bags" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_tiles_player_id_game_id_idx" ON "player_tiles" USING btree ("player_id","game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "boards_game_id_idx" ON "boards" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "boards_game_id_tile_id_idx" ON "boards" USING btree ("game_id","tile_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "move_tiles_move_id_idx" ON "move_tiles" USING btree ("move_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "moves_game_id_idx" ON "moves" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "moves_player_id_idx" ON "moves" USING btree ("player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "moves_game_id_player_id_idx" ON "moves" USING btree ("game_id","player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "moves_word_id_idx" ON "moves" USING btree ("word");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_user_id_idx" ON "players" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_game_id_idx" ON "players" USING btree ("game_id");--> statement-breakpoint
ALTER TABLE "boards" DROP COLUMN IF EXISTS "x";--> statement-breakpoint
ALTER TABLE "boards" DROP COLUMN IF EXISTS "y";