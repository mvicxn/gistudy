import { currentUser, json, unauthorized, type Env } from "../../_shared/auth";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const user = await currentUser(context.request, context.env.DB);
  if (!user) return unauthorized();
  if (user.username !== "admin") return json({ error: "Acesso restrito." }, { status: 403 });

  await context.env.DB.prepare("DELETE FROM progress WHERE user_id = ?").bind(user.id).run();
  return json({ ok: true });
};
