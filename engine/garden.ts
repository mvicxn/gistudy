import type { Flower, ProgressSnapshot } from "@/domain/experience";

export function flowerForChapter(snapshot: ProgressSnapshot, chapterId: string): Flower {
  return (
    snapshot.flowers.find((flower) => flower.chapterId === chapterId) ?? {
      id: `plot_${chapterId}`,
      chapterId,
      state: "empty",
    }
  );
}

export function upsertFlower(snapshot: ProgressSnapshot, flower: Flower): Flower[] {
  const others = snapshot.flowers.filter((item) => item.chapterId !== flower.chapterId);
  return [...others, flower];
}
