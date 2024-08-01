import "jsr:@std/dotenv/load";
import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve({
  port: Deno.env.get("PORT") ? parseInt(Deno.env.get("PORT")!) : 8000,
  handler: app.fetch,
});
