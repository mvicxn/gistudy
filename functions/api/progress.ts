import { currentUser, json, unauthorized, type Env } from "../_shared/auth";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const user = await currentUser(context.request, context.env.DB);
  if (!user) return unauthorized();
  const row = await context.env.DB.prepare("SELECT snapshot FROM progress WHERE user_id = ?").bind(user.id).first<{ snapshot: string }>();
  return json({ snapshot: row ? JSON.parse(row.snapshot) : null });
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const user = await currentUser(context.request, context.env.DB);
  if (!user) return unauthorized();
  const body = (await context.request.json().catch(() => null)) as { snapshot?: unknown } | null;
  if (!body || (!body.snapshot ? body.snapshot !== null : typeof body.snapshot !== "object")) {
    return json({ error: "Progresso inválido." }, { status: 400 });
  }
  if (body.snapshot === null) {
    await context.env.DB.prepare("DELETE FROM progress WHERE user_id = ?").bind(user.id).run();
    return json({ ok: true });
  }
  await context.env.DB.prepare(
    "INSERT INTO progress (user_id, snapshot, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(user_id) DO UPDATE SET snapshot = excluded.snapshot, updated_at = excluded.updated_at",
  )
    .bind(user.id, JSON.stringify(body.snapshot))
    .run();
  return json({ ok: true });
};
