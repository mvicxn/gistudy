import { currentUser, json, type Env } from "../../_shared/auth";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const user = await currentUser(context.request, context.env.DB);
  return user ? json({ user }) : json({ error: "Não autenticado" }, { status: 401 });
};
