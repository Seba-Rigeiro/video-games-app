export enum Sizes {
  THUMB = "t_thumb",
  SMALL = "t_cover_small",
  BIG = "t_cover_big",
  ORIGINAL = "t_original",
}

export const getCoverUrl = (coverId: string, size: Sizes) => {
  return `https://images.igdb.com/igdb/image/upload/${size}/${coverId}.jpg`;
};
