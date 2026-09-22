export type Env = { DB: D1Database };

export type User = { id: string; username: string };

const COOKIE = "mm_study_session";
const SESSION_DAYS = 7;

function base64(bytes: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

export async function digest(value: string) {
  return base64(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

export async function verifyPassword(password: string, salt: string, expected: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: new TextEncoder().encode(salt), iterations: 100000, hash: "SHA-256" },
    key,
    256,
  );
  const actual = new Uint8Array(fromBase64(expected));
  const candidate = new Uint8Array(bits);
  return actual.length === candidate.length && actual.every((byte, index) => byte === candidate[index]);
}

export function getCookie(request: Request) {
  const header = request.headers.get("Cookie") ?? "";
  return header
    .split(";")
    .map((part) => part.trim().split("="))
    .find(([name]) => name === COOKIE)?.[1];
}

export async function currentUser(request: Request, db: D1Database): Promise<User | null> {
  const token = getCookie(request);
  if (!token) return null;
  const row = await db
    .prepare(
      "SELECT users.id, users.username FROM sessions JOIN users ON users.id = sessions.user_id WHERE sessions.token_hash = ? AND sessions.expires_at > datetime('now')",
    )
    .bind(await digest(token))
    .first<User>();
  return row ?? null;
}

export function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...init.headers },
  });
}

export function sessionCookie(token: string) {
  const expires = new Date(Date.now() + SESSION_DAYS * 86400000).toUTCString();
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expires}`;
}

export function expiredCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export function unauthorized() {
  return json({ error: "Não autenticado" }, { status: 401 });
}
