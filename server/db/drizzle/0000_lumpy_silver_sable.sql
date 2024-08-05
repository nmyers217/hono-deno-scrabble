DO $$ BEGIN
 CREATE TYPE "public"."direction" AS ENUM('horizontal', 'vertical');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."letter" AS ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."move_type" AS ENUM('extension', 'parallel', 'cross', 'hook');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "boards" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"tile_id" integer NOT NULL,
	"x" integer NOT NULL,
	"y" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_tiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"move_id" integer NOT NULL,
	"tile_id" integer NOT NULL,
	"point" "point" NOT NULL,
	"order" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moves" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"player_id" integer NOT NULL,
	"word" varchar(7) NOT NULL,
	"direction" "direction" NOT NULL,
	"type" "move_type" NOT NULL,
	"bingo" boolean DEFAULT false NOT NULL,
	"secondaries" text DEFAULT '' NOT NULL,
	"score" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"game_id" integer NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"letter" "letter" NOT NULL,
	"value" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tiles_letter_unique" UNIQUE("letter")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_tile_id_tiles_id_fk" FOREIGN KEY ("tile_id") REFERENCES "public"."tiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_tiles" ADD CONSTRAINT "move_tiles_move_id_moves_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."moves"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_tiles" ADD CONSTRAINT "move_tiles_tile_id_tiles_id_fk" FOREIGN KEY ("tile_id") REFERENCES "public"."tiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moves" ADD CONSTRAINT "moves_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moves" ADD CONSTRAINT "moves_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "boards_game_idx" ON "boards" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "move_tiles_move_idx" ON "move_tiles" USING btree ("move_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "moves_game_player_idx" ON "moves" USING btree ("game_id","player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "moves_game_idx" ON "moves" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "moves_player_idx" ON "moves" USING btree ("player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "moves_word_idx" ON "moves" USING btree ("word");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_user_idx" ON "players" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_game_idx" ON "players" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_user_game_idx" ON "players" USING btree ("user_id","game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "letter_idx" ON "tiles" USING btree ("letter");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");