import { digest, expiredCookie, getCookie, json, type Env } from "../../_shared/auth";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const token = getCookie(context.request);
  if (token) await context.env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await digest(token)).run();
  return json({ ok: true }, { headers: { "Set-Cookie": expiredCookie() } });
};
