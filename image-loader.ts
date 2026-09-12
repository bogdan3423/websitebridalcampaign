"use client";
import type { ImageLoaderProps } from "next/image";
// Variants are created locally before dev/build; no runtime image service is required.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("/images/") || !/\.(webp|png|jpe?g)$/i.test(src))
    return src;
  const name = src
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, "");
  const size =
    [320, 480, 768, 1200, 1600].find((value) => value >= width) ?? 1600;
  return `/images/responsive/${name}-${size}.webp`;
}
