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
        clientId: c.env.GITHUB_ID,
        clientSecret: c.env.GITHUB_SECRET,
      }),
    ],
  };
}
