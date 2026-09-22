import { currentUser, digest, json, sessionCookie, verifyPassword, type Env } from "../../_shared/auth";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const body = (await context.request.json().catch(() => null)) as { username?: string; password?: string } | null;
  if (!body?.username || !body.password || body.username.length > 64 || body.password.length > 256) {
    return json({ error: "Usuário e senha são obrigatórios." }, { status: 400 });
  }
  const row = await context.env.DB.prepare(
    "SELECT id, username, password_salt, password_hash FROM users WHERE username = ?",
  )
    .bind(body.username.trim().toLowerCase())
    .first<{ id: string; username: string; password_salt: string; password_hash: string }>();
  if (!row || !(await verifyPassword(body.password, row.password_salt, row.password_hash))) {
    return json({ error: "Usuário ou senha inválidos." }, { status: 401 });
  }
  const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
  const token = Array.from(tokenBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  await context.env.DB.prepare(
    "INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, datetime('now', '+7 days'))",
  )
    .bind(crypto.randomUUID(), row.id, await digest(token))
    .run();
  return json(
    { user: { id: row.id, username: row.username } },
    { headers: { "Set-Cookie": sessionCookie(token) } },
  );
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const user = await currentUser(context.request, context.env.DB);
  return user ? json({ user }) : json({ error: "Não autenticado" }, { status: 401 });
};
