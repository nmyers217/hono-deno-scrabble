import "jsr:@std/dotenv/load";
import { Context, Hono } from "hono";
import { serveStatic } from "hono/deno";
import {
  type AuthConfig,
  authHandler,
  initAuthConfig,
  verifyAuth,
} from "npm:@hono/auth-js";
import GitHub from "npm:@auth/core/providers/github";
import Google from "npm:@auth/core/providers/google";
import Discord from "npm:@auth/core/providers/discord";
import Credentials from "npm:@auth/core/providers/credentials";

// TODO: Implement salt and hash password function
function saltAndHashPassword(password: string): string {
  return password;
}

// TODO: get a real db
interface User {
  id: string;
  email: string;
  password: string;
}
const users: Record<string, User> = {
  "nick@example.com": {
    id: "0",
    email: "nick@example.com",
    password: "123abc",
  },
};
const db = {
  users,
  findUser: async (email: string, pwHash: string) => {
    return db.users[email]?.password === pwHash ? db.users[email] : null;
  },
};

const app = new Hono();

app.use("*", initAuthConfig(getAuthConfig));

app.use("/static/*", serveStatic({ root: "./" }));

app.use("/api/auth/*", authHandler());
app.use("/api/*", verifyAuth());
app.get("/api/protected", (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve({
  port: Deno.env.get("PORT") ? parseInt(Deno.env.get("PORT")!) : 8000,
  handler: app.fetch,
});

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: Deno.env.get("AUTH_SECRET"),
    providers: [
      GitHub({
        clientId: Deno.env.get("GITHUB_ID")!,
        clientSecret: Deno.env.get("GITHUB_SECRET")!,
      }),
      Google({
        clientId: Deno.env.get("GOOGLE_ID")!,
        clientSecret: Deno.env.get("GOOGLE_SECRET")!,
      }),
      Discord({
        clientId: Deno.env.get("DISCORD_ID")!,
        clientSecret: Deno.env.get("DISCORD_SECRET")!,
      }),
      Credentials({
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          const pwHash = saltAndHashPassword(credentials.password as string);
          return await db.findUser(credentials.email as string, pwHash);
        },
      }),
    ],
  };
}
