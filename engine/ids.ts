let seq = 0;

export function nextId(prefix: string, now = Date.now()) {
  seq += 1;
  return `${prefix}_${now.toString(36)}_${seq.toString(36)}`;
}
